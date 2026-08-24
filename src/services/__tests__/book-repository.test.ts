import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { sliceContentIntoPages } from '../../components/reader/reader-canvas';
import { BOOKS_CATALOG, getBookById } from '../book-repository';

describe('Book Repository Service', () => {
  it('loads curated books catalog with at least 2 classic titles', () => {
    assert.ok(BOOKS_CATALOG.length >= 2);
    const meditations = getBookById('meditations');
    assert.ok(meditations !== undefined);
    if (meditations) {
      assert.equal(meditations.title, 'Meditations');
      assert.equal(meditations.author, 'Marcus Aurelius');
      assert.ok(meditations.chapters.length > 0);
    }
  });

  it('slices text into discrete pages based on font size budget', () => {
    const sampleText = `Paragraph one of the book text.

Paragraph two of the book text with slightly longer sentences.

Paragraph three of the book text going on to demonstrate pagination calculations.`;

    const pagesSmall = sliceContentIntoPages(sampleText, 14);
    const pagesLarge = sliceContentIntoPages(sampleText, 24);

    assert.ok(Array.isArray(pagesSmall));
    assert.ok(Array.isArray(pagesLarge));
    assert.ok(pagesSmall.length > 0);
    assert.ok(pagesLarge.length >= pagesSmall.length);
  });
});
