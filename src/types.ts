import { Language } from "./utils/translations";

export type StudyMode = "classic" | "grammar" | "reverse" | "quiz";

export type LocalizedField = string | Partial<Record<Language, string>>;

export type CardStatus = "unseen" | "learning" | "known";

export type DeckType = "basic" | "nouns" | "grammar" | "phrases";

export interface Flashcard {
  id: string;
  german: string; // Німецьке слово або фраза
  translation: LocalizedField; // Переклад українською
  article?: "der" | "die" | "das" | ""; // Артикль (якщо іменник)
  plural?: string; // Форма множини, напр. "-e", "-er", "-n"
  preposition?: string; // Прийменник та відмінок, напр. "auf (+Akk)", "von (+Dat)"
  exampleGerman?: string; // Приклад речення німецькою
  exampleTranslation?: LocalizedField; // Переклад прикладу українською
  partOfSpeech?: "noun" | "verb" | "adjective" | "phrase" | "other";
  notes?: LocalizedField; // Додаткові примітки / визначення
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  type?: DeckType;
  icon?: string; // Lucide icon name or emoji
  category: string; // "Загальні", "Граматика", "Мої списки" etc.
  isPublic: boolean; // Чи це загальний список для всіх
  isPinned?: boolean;
  createdAt: number;
  updatedAt: number;
  cards: Flashcard[];
}

export interface CardProgress {
  cardId: string;
  deckId: string;
  status: CardStatus;
  lastReviewedAt?: number;
  timesCorrect: number;
  timesIncorrect: number;
  starred?: boolean;
}

export interface DeckStats {
  total: number;
  known: number;
  learning: number;
  unseen: number;
  percentage: number;
}
