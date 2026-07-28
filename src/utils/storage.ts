import { CardProgress, Deck, DeckStats } from '../types';
import { INITIAL_DECKS } from '../data/initialDecks';

const DECKS_KEY = 'deutschcards_user_decks_v1';
const PROGRESS_KEY = 'deutschcards_progress_v1';
const PINNED_KEY = 'deutschcards_pinned_v1';

// Load all decks (Public + User created)
export function getStoredDecks(): Deck[] {
  try {
    const rawUserDecks = localStorage.getItem(DECKS_KEY);
    const userDecks: Deck[] = rawUserDecks ? JSON.parse(rawUserDecks) : [];

    // Combine public initial decks and user custom decks
    // Ensure public decks stay up-to-date with initial decks
    const combined = [...INITIAL_DECKS];

    userDecks.forEach((userDeck) => {
      const existingIdx = combined.findIndex((d) => d.id === userDeck.id);
      if (existingIdx >= 0) {
        combined[existingIdx] = userDeck;
      } else {
        combined.push(userDeck);
      }
    });

    return combined;
  } catch (e) {
    console.error('Failed to parse decks from localStorage', e);
    return INITIAL_DECKS;
  }
}

// Save user created/updated decks
export function saveUserDecks(decks: Deck[]): void {
  try {
    // Only save custom non-public decks OR modified versions
    const customOrModified = decks.filter((d) => !d.isPublic || d.updatedAt > d.createdAt);
    localStorage.setItem(DECKS_KEY, JSON.stringify(customOrModified));
  } catch (e) {
    console.error('Failed to save decks to localStorage', e);
  }
}

// Get all progress maps { [cardKey]: CardProgress }
export function getStoredProgress(): Record<string, CardProgress> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Failed to parse progress', e);
    return {};
  }
}

// Save card progress
export function saveCardProgress(progress: CardProgress): Record<string, CardProgress> {
  const current = getStoredProgress();
  const key = `${progress.deckId}_${progress.cardId}`;
  current[key] = {
    ...progress,
    lastReviewedAt: Date.now(),
  };

  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save card progress', e);
  }

  return current;
}

// Get pinned deck IDs
export function getStoredPinned(): string[] {
  try {
    const raw = localStorage.getItem(PINNED_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load pinned decks', e);
  }
  // Default pins from initial decks
  return INITIAL_DECKS.filter((d) => d.isPinned).map((d) => d.id);
}

// Save pinned deck IDs
export function savePinnedDecks(pinnedIds: string[]): void {
  try {
    localStorage.setItem(PINNED_KEY, JSON.stringify(pinnedIds));
  } catch (e) {
    console.error('Failed to save pinned decks', e);
  }
}

// Calculate deck statistics
export function calculateDeckStats(
  deck: Deck,
  progressMap: Record<string, CardProgress>
): DeckStats {
  const total = deck.cards.length;
  if (total === 0) {
    return { total: 0, known: 0, learning: 0, unseen: 0, percentage: 0 };
  }

  let known = 0;
  let learning = 0;
  let unseen = 0;

  deck.cards.forEach((card) => {
    const key = `${deck.id}_${card.id}`;
    const p = progressMap[key];

    if (!p || p.status === 'unseen') {
      unseen++;
    } else if (p.status === 'known') {
      known++;
    } else if (p.status === 'learning') {
      learning++;
    }
  });

  const percentage = Math.round((known / total) * 100);

  return { total, known, learning, unseen, percentage };
}

// Reset progress for a specific deck
export function resetDeckProgress(deckId: string): Record<string, CardProgress> {
  const current = getStoredProgress();
  Object.keys(current).forEach((key) => {
    if (key.startsWith(`${deckId}_`)) {
      delete current[key];
    }
  });

  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to reset deck progress', e);
  }

  return current;
}

// Export backup data as JSON file download
export function exportDataAsJSON(): void {
  const data = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    decks: getStoredDecks().filter((d) => !d.isPublic),
    progress: getStoredProgress(),
    pinned: getStoredPinned(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `deutschcards_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Import backup data from JSON text
export function importDataFromJSON(jsonString: string): { success: boolean; message: string } {
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== 'object') {
      return { success: false, message: 'Некоректний формат файлу' };
    }

    if (Array.isArray(data.decks)) {
      const currentDecks = getStoredDecks();
      // Merge imported custom decks
      data.decks.forEach((importedDeck: Deck) => {
        const idx = currentDecks.findIndex((d) => d.id === importedDeck.id);
        if (idx >= 0) {
          currentDecks[idx] = importedDeck;
        } else {
          currentDecks.push(importedDeck);
        }
      });
      saveUserDecks(currentDecks);
    }

    if (data.progress && typeof data.progress === 'object') {
      const currentProgress = getStoredProgress();
      const merged = { ...currentProgress, ...data.progress };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(merged));
    }

    if (Array.isArray(data.pinned)) {
      savePinnedDecks(data.pinned);
    }

    return { success: true, message: 'Дані успішно імпортовано!' };
  } catch (e) {
    return { success: false, message: `Помилка читання JSON: ${(e as Error).message}` };
  }
}
