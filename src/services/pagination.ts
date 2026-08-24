const CHARS_PER_PAGE_BASE = 550;

export function sliceContentIntoPages(content: string, fontSize: number): string[] {
  const budget = Math.floor(CHARS_PER_PAGE_BASE * (18 / Math.max(12, fontSize)));
  const paragraphs = content.split('\n\n');
  const pages: string[] = [];
  let currentPage = '';

  for (const para of paragraphs) {
    if ((currentPage + para).length > budget && currentPage.trim().length > 0) {
      pages.push(currentPage.trim());
      currentPage = para + '\n\n';
    } else {
      currentPage += para + '\n\n';
    }
  }

  if (currentPage.trim().length > 0) {
    pages.push(currentPage.trim());
  }

  return pages.length > 0 ? pages : [content];
}
