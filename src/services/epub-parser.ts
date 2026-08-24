import JSZip from 'jszip';

import { Book, Chapter } from '../types/reader';

export function htmlToPlainText(html: string): string {
  let text = html;

  // Remove <head>, <script>, <style> blocks
  text = text.replace(/<head[\s\S]*?<\/head>/gi, '');
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');

  // Convert break tags and paragraph tags to newlines
  text = text.replace(/<br\s*[\/]?>/gi, '\n');
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<\/h[1-6]>/gi, '\n\n');
  text = text.replace(/<\/div>/gi, '\n');
  text = text.replace(/<\/li>/gi, '\n');

  // Strip all other HTML/XML tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…');

  // Clean up excessive whitespace
  text = text.replace(/[ \t]+/g, ' ');
  text = text.replace(/\n\s+\n/g, '\n\n');
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

function extractTagContent(xml: string, tagName: string): string {
  const regex = new RegExp(`<(?:[a-zA-Z0-9_-]+:)?${tagName}[^>]*>([\\s\\S]*?)<\\/(?:[a-zA-Z0-9_-]+:)?${tagName}>`, 'i');
  const match = xml.match(regex);
  return match && match[1] ? match[1].trim() : '';
}

function resolvePath(basePath: string, relativePath: string): string {
  const stack = basePath ? basePath.split('/') : [];
  stack.pop(); // Remove current filename to get directory

  const parts = relativePath.split('/');
  for (const part of parts) {
    if (part === '.' || part === '') continue;
    if (part === '..') {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(part);
    }
  }
  return stack.join('/');
}

export async function parseEpub(
  data: ArrayBuffer | Uint8Array | string,
  fallbackTitle = 'Imported Book'
): Promise<Book> {
  const zip = await JSZip.loadAsync(data);

  // 1. Locate rootfile from META-INF/container.xml
  const containerXmlFile = zip.file('META-INF/container.xml');
  if (!containerXmlFile) {
    throw new Error('Invalid EPUB: META-INF/container.xml not found.');
  }
  const containerXml = await containerXmlFile.async('string');

  const rootfileMatch = containerXml.match(/full-path\s*=\s*["']([^"']+)["']/i);
  if (!rootfileMatch || !rootfileMatch[1]) {
    throw new Error('Invalid EPUB: Rootfile path missing in container.xml.');
  }

  const opfPath = rootfileMatch[1];
  const opfFile = zip.file(opfPath);
  if (!opfFile) {
    throw new Error(`Invalid EPUB: Package file ${opfPath} not found.`);
  }
  const opfXml = await opfFile.async('string');

  // 2. Extract Metadata
  const title = extractTagContent(opfXml, 'title') || fallbackTitle;
  const author = extractTagContent(opfXml, 'creator') || 'Unknown Author';
  const description = extractTagContent(opfXml, 'description') || 'Imported EPUB document.';

  // 3. Extract Manifest Items
  const manifestMap: Record<string, string> = {};
  const manifestRegex = /<item\s+[^>]*id=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*\/?>/gi;
  let manifestMatch: RegExpExecArray | null;

  while ((manifestMatch = manifestRegex.exec(opfXml)) !== null) {
    manifestMap[manifestMatch[1]] = manifestMatch[2];
  }

  // Also handle reversed attribute order (href before id)
  const manifestAltRegex = /<item\s+[^>]*href=["']([^"']+)["'][^>]*id=["']([^"']+)["'][^>]*\/?>/gi;
  let manifestAltMatch: RegExpExecArray | null;
  while ((manifestAltMatch = manifestAltRegex.exec(opfXml)) !== null) {
    if (!manifestMap[manifestAltMatch[2]]) {
      manifestMap[manifestAltMatch[2]] = manifestAltMatch[1];
    }
  }

  // 4. Extract Spine Order
  const spineItemRefs: string[] = [];
  const spineRegex = /<itemref\s+[^>]*idref=["']([^"']+)["'][^>]*\/?>/gi;
  let spineMatch: RegExpExecArray | null;

  while ((spineMatch = spineRegex.exec(opfXml)) !== null) {
    spineItemRefs.push(spineMatch[1]);
  }

  // 5. Read Chapters in Sequential Order
  const bookId = `epub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const chapters: Chapter[] = [];
  let totalWordCount = 0;

  for (let i = 0; i < spineItemRefs.length; i++) {
    const idref = spineItemRefs[i];
    const relativeHref = manifestMap[idref];
    if (!relativeHref) continue;

    const fullChapterPath = resolvePath(opfPath, relativeHref);
    const chapterFile = zip.file(fullChapterPath);
    if (!chapterFile) continue;

    const rawHtml = await chapterFile.async('string');
    const plainText = htmlToPlainText(rawHtml);

    if (plainText.length < 20) {
      // Skip empty or tiny cover-only fragments
      continue;
    }

    const chapterTitleMatch = extractTagContent(rawHtml, 'title') || extractTagContent(rawHtml, 'h1') || extractTagContent(rawHtml, 'h2');
    const chapterTitle = chapterTitleMatch ? htmlToPlainText(chapterTitleMatch) : `Chapter ${chapters.length + 1}`;

    totalWordCount += plainText.split(/\s+/).length;

    chapters.push({
      id: `${bookId}-ch-${chapters.length + 1}`,
      bookId,
      order: chapters.length + 1,
      title: chapterTitle,
      content: plainText,
    });
  }

  if (chapters.length === 0) {
    throw new Error('Could not extract readable chapter content from EPUB.');
  }

  const estimatedMinutes = Math.max(1, Math.round(totalWordCount / 200));
  const estimatedReadTime =
    estimatedMinutes > 60
      ? `${Math.floor(estimatedMinutes / 60)}h ${estimatedMinutes % 60}m`
      : `${estimatedMinutes}m`;

  const coverPalette = ['#1E2522', '#2B2B2B', '#2A2724', '#1F2428', '#252120'];
  const coverColor = coverPalette[Math.floor(Math.random() * coverPalette.length)];

  return {
    id: bookId,
    title,
    author,
    coverColor,
    description,
    publishedYear: new Date().getFullYear(),
    totalChapters: chapters.length,
    estimatedReadTime,
    chapters,
  };
}
