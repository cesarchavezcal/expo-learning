import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Book } from '../types/reader';

export const BOOKS_CATALOG: Book[] = [
  {
    id: 'meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    coverColor: '#2B2B2B',
    description: 'Personal reflections on Stoic philosophy, self-discipline, and inner tranquility written by the Roman Emperor.',
    publishedYear: 180,
    totalChapters: 4,
    estimatedReadTime: '2h 15m',
    chapters: [
      {
        id: 'book-1',
        bookId: 'meditations',
        order: 1,
        title: 'Book I — Debts and Lessons',
        content: `From my grandfather Verus I learned good morals and the government of my temper.

From the reputation and remembrance of my father, modesty and a manly character.

From my mother, piety and beneficence, and abstinence, not only from evil deeds, but even from evil thoughts; and further, simplicity in my way of living, far removed from the habits of the rich.

From my great-grandfather, not to have frequented public schools, and to have had good teachers at home, and to know that on such things a man should spend liberally.

From my governor, to be neither of the green nor of the blue party at the games in the Circus, nor a supporter either of the Parmularius or the Scutarius at the gladiators' fights; from him too I learned endurance of labour, and to want little, and to work with my own hands, and not to meddle with other people's affairs, and not to be ready to listen to slander.`,
      },
      {
        id: 'book-2',
        bookId: 'meditations',
        order: 2,
        title: 'Book II — On the River Granua',
        content: `When you wake up in the morning, tell yourself: The people I deal with today will be meddling, ungrateful, arrogant, dishonest, jealous, and surly. They are like this because they cannot distinguish good from evil.

But I have seen the beauty of good, and the ugliness of evil, and have recognized that the wrongdoer has a nature related to my own—not of the same blood or birth, but the same mind, and possessing a share of the divine.

None of them can hurt me. No one can implicate me in ugliness. Nor can I feel angry at my kin, or hate him. We were made to work together like hands, like feet, like the rows of the upper and lower teeth. To obstruct each other is contrary to nature.`,
      },
      {
        id: 'book-3',
        bookId: 'meditations',
        order: 3,
        title: 'Book III — In Carnuntum',
        content: `We ought to observe also that even the things which follow after the things which are produced according to nature contain something pleasing and attractive.

For instance, when bread is baked some parts are split open on the surface, and these parts which have thus opened, and have a certain fashion contrary to the purpose of the baker's art, are beautiful in a manner, and in a peculiar way excite a desire for eating.

And again, figs, when they are quite ripe, gape open; and in the ripe olives the very circumstance of their being near to rottenness adds a peculiar beauty to the fruit.

And the ears of corn bending down, and the lion's eyebrows, and the foam which flows from the mouth of wild boars, and many other things—though they are far from being beautiful if a man considers them by themselves—yet because they are a consequence of the things which are produced according to nature, help to adorn them, and they please the mind.`,
      },
      {
        id: 'book-4',
        bookId: 'meditations',
        order: 4,
        title: 'Book IV — The Inner Citadel',
        content: `Men seek retreats for themselves, houses in the country, sea-shores, and mountains; and thou too art wont to desire such things very much. But this is altogether a mark of the most common sort of men, for it is in thy power whenever thou shalt choose to retire into thyself.

For nowhere either with more quiet or more freedom from trouble does a man retire than into his own soul, particularly when he has within him such thoughts that by looking into them he is immediately in perfect tranquility; and I affirm that tranquility is nothing else than the good ordering of the mind.

Constantly then give to thyself this retreat, and renew thyself; and let thy rules be short and fundamental, which as soon as you look into them, will purge away all your disgust, and send you back without any irritation to the life to which you must return.`,
      },
    ],
  },
  {
    id: 'art-of-war',
    title: 'The Art of War',
    author: 'Sun Tzu',
    coverColor: '#1E2522',
    description: 'An ancient treatise on strategy, positioning, psychological focus, and disciplined leadership.',
    publishedYear: -500,
    totalChapters: 3,
    estimatedReadTime: '1h 30m',
    chapters: [
      {
        id: 'aow-1',
        bookId: 'art-of-war',
        order: 1,
        title: 'Chapter I — Laying Plans',
        content: `Sun Tzu said: The art of war is of vital importance to the State. It is a matter of life and death, a road either to safety or to ruin. Hence it is a subject of inquiry which can on no account be neglected.

The art of war, then, is governed by five constant factors, to be taken into account in one's deliberations, when seeking to determine the conditions obtaining in the field.

These are: The Moral Law; Heaven; Earth; The Commander; Method and discipline.

All warfare is based on deception. Hence, when able to attack, we must seem unable; when using our forces, we must seem inactive; when we are near, we must make the enemy believe we are far away; when far away, we must make him believe we are near.`,
      },
      {
        id: 'aow-2',
        bookId: 'art-of-war',
        order: 2,
        title: 'Chapter II — Waging War',
        content: `Sun Tzu said: In the operations of war, where there are in the field a thousand swift chariots, as many heavy chariots, and a hundred thousand mail-clad soldiers, with provisions enough to carry them a thousand li, the expenditure at home and at the front will reach the total of a thousand ounces of silver per day. Such is the cost of raising an army of 100,000 men.

When you engage in actual fighting, if victory is long in coming, then men's weapons will grow dull and their ardor will be damped. If you lay siege to a town, you will exhaust your strength.

Now, when your weapons are dulled, your ardor damped, your strength exhausted and your treasure spent, other chieftains will spring up to take advantage of your extremity. Then no man, however wise, will be able to avert the consequences that must ensue.`,
      },
      {
        id: 'aow-3',
        bookId: 'art-of-war',
        order: 3,
        title: 'Chapter III — Attack by Stratagem',
        content: `Sun Tzu said: In the practical art of war, the best thing of all is to take the enemy's country whole and intact; to shatter and destroy it is not so good. So, too, it is better to recapture an army entire than to destroy it.

Hence to fight and conquer in all your battles is not supreme excellence; supreme excellence consists in breaking the enemy's resistance without fighting.

Thus the highest form of generalship is to balk the enemy's plans; the next best is to prevent the junction of the enemy's forces; the next in order is to attack the enemy's army in the field; and the worst policy of all is to besiege walled cities.

If you know the enemy and know yourself, you need not fear the result of a hundred battles. If you know yourself but not the enemy, for every victory gained you will also suffer a defeat. If you know neither the enemy nor yourself, you will succumb in every battle.`,
      },
    ],
  },
];

const CUSTOM_BOOKS_STORAGE_KEY = '@eink_custom_books';

let inMemoryCustomBooks: Book[] = [];

export async function loadCustomBooks(): Promise<Book[]> {
  try {
    const raw = await AsyncStorage.getItem(CUSTOM_BOOKS_STORAGE_KEY);
    if (raw) {
      inMemoryCustomBooks = JSON.parse(raw);
      return inMemoryCustomBooks;
    }
  } catch {
    // Return in-memory fallback
  }
  return inMemoryCustomBooks;
}

export async function saveCustomBook(book: Book): Promise<void> {
  const existing = inMemoryCustomBooks.filter((b) => b.id !== book.id);
  inMemoryCustomBooks = [book, ...existing];
  try {
    await AsyncStorage.setItem(
      CUSTOM_BOOKS_STORAGE_KEY,
      JSON.stringify(inMemoryCustomBooks)
    );
  } catch {
    // Ignore error
  }
}

export async function deleteCustomBook(bookId: string): Promise<void> {
  inMemoryCustomBooks = inMemoryCustomBooks.filter((b) => b.id !== bookId);
  try {
    await AsyncStorage.setItem(
      CUSTOM_BOOKS_STORAGE_KEY,
      JSON.stringify(inMemoryCustomBooks)
    );
  } catch {
    // Ignore error
  }
}

export function getAllBooks(): Book[] {
  return [...inMemoryCustomBooks, ...BOOKS_CATALOG];
}

export function getBookById(id: string): Book | undefined {
  const custom = inMemoryCustomBooks.find((book) => book.id === id);
  if (custom) return custom;
  return BOOKS_CATALOG.find((book) => book.id === id);
}
