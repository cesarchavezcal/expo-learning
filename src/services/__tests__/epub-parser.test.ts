import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import JSZip from 'jszip';

import { htmlToPlainText, parseEpub } from '../epub-parser';

describe('EPUB Parser Service', () => {
  it('cleans HTML tags, decodes entities, and converts breaks to newlines', () => {
    const rawHtml = `<html><head><style>body { color: red; }</style></head>
      <body>
        <h1>Title &amp; Subtitle</h1>
        <p>Paragraph 1 with &ldquo;quotes&rdquo; and &mdash; dashes.</p>
        <p>Paragraph 2 with <br/>line break.</p>
      </body></html>`;

    const cleaned = htmlToPlainText(rawHtml);
    assert.ok(cleaned.includes('Title & Subtitle'));
    assert.ok(cleaned.includes('Paragraph 1 with'));
    assert.ok(cleaned.includes('Paragraph 2 with \nline break.'));
    assert.ok(!cleaned.includes('<style>'));
    assert.ok(!cleaned.includes('<h1>'));
  });

  it('unpacks and parses a valid EPUB zip structure into a Book object', async () => {
    const zip = new JSZip();

    // 1. Container XML
    zip.file(
      'META-INF/container.xml',
      `<?xml version="1.0"?>
      <container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
        <rootfiles>
          <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
        </rootfiles>
      </container>`
    );

    // 2. OPF Package file
    zip.file(
      'OEBPS/content.opf',
      `<?xml version="1.0" encoding="UTF-8"?>
      <package xmlns="http://www.idpf.org/2007/opf" version="2.0">
        <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
          <dc:title>Test Scandinavian Novel</dc:title>
          <dc:creator>Knut Hamsun</dc:creator>
          <dc:description>A classic Nordic tale of solitude and intellect.</dc:description>
        </metadata>
        <manifest>
          <item id="ch1" href="text/ch1.xhtml" media-type="application/xhtml+xml"/>
          <item id="ch2" href="text/ch2.xhtml" media-type="application/xhtml+xml"/>
        </manifest>
        <spine>
          <itemref idref="ch1"/>
          <itemref idref="ch2"/>
        </spine>
      </package>`
    );

    // 3. Chapter files
    zip.file(
      'OEBPS/text/ch1.xhtml',
      `<?xml version="1.0" encoding="utf-8"?>
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head><title>Chapter 1: The Arrival</title></head>
        <body>
          <h1>Chapter 1: The Arrival</h1>
          <p>It was in those days when I wandered about starving in Kristiania.</p>
        </body>
      </html>`
    );

    zip.file(
      'OEBPS/text/ch2.xhtml',
      `<?xml version="1.0" encoding="utf-8"?>
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head><title>Chapter 2: The Northern Frost</title></head>
        <body>
          <h1>Chapter 2: The Northern Frost</h1>
          <p>The autumn frost had set in over the fjords and pine trees.</p>
        </body>
      </html>`
    );

    const binaryEpub = await zip.generateAsync({ type: 'nodebuffer' });
    const book = await parseEpub(binaryEpub);

    assert.equal(book.title, 'Test Scandinavian Novel');
    assert.equal(book.author, 'Knut Hamsun');
    assert.equal(book.totalChapters, 2);
    assert.equal(book.chapters[0].title, 'Chapter 1: The Arrival');
    assert.ok(book.chapters[0].content.includes('starving in Kristiania'));
    assert.equal(book.chapters[1].title, 'Chapter 2: The Northern Frost');
    assert.ok(book.chapters[1].content.includes('over the fjords'));
  });
});
