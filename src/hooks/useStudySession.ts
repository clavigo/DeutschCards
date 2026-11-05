// src/hooks/useStudySession.ts
import {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useToast } from "../hooks";
import { saveCardProgress } from "../utils/storage";
import { Deck, Flashcard, StudyMode, CardProgress } from "../types";
import { Language, getTranslation } from "../utils/translations";
import confetti from "canvas-confetti";

export const ANIMATION_DURATION = 0.5;
export const FLIP_DELAY_MS = ANIMATION_DURATION * 500;

interface StudySessionProps {
  activeDeck: Deck;
  progressMap: Record<string, CardProgress>;
  uiLanguage: Language;
  setProgressMap: Dispatch<SetStateAction<Record<string, CardProgress>>>;
  showToast: (msg: string) => void;
}

export const useStudySession = ({
  activeDeck,
  progressMap,
  uiLanguage,
  setProgressMap,
  showToast,
}: StudySessionProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [studyMode, setStudyMode] = useState<StudyMode>("classic");
  const [currentCards, setCurrentCards] = useState<Flashcard[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isUnseenOnlyMode, setIsUnseenOnlyMode] = useState<boolean>(false);

  useEffect(() => {
    if (!activeDeck || !activeDeck.cards) {
      setCurrentCards([]);
      setCurrentCardIndex(0);
      setIsFlipped(false);
      return;
    }

    let cardsToShow = activeDeck.cards;

    // Якщо ввімкнено режим "тільки невивчені", фільтруємо картки
    if (isUnseenOnlyMode) {
      cardsToShow = activeDeck.cards.filter((card) => {
        const cardKey = `${activeDeck.id}_${card.id}`;
        const progress = progressMap[cardKey];
        // Залишаємо картку, якщо в неї немає прогресу АБО статус НЕ "known"
        return !progress || progress.status !== "known";
      });

      // Якщо невивчених карток немає взагалі (всі вивчені), показуємо повідомлення
      // і можемо автоматично вимкнути цей режим
      if (cardsToShow.length === 0) {
        // showToast(getTranslation(uiLanguage, "allWordsLearned")); // Додай цей переклад, якщо його немає: "Всі слова вже вивчені! 🥳"
        setIsUnseenOnlyMode(false);
        cardsToShow = activeDeck.cards;
      }
    }

    // Якщо ми були на картці з індексом 10, а після фільтрації лишилося 5 карток,
    // треба скинути індекс, щоб не вийти за межі масиву
    setCurrentCards(cardsToShow);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  }, [activeDeck?.id, isUnseenOnlyMode]);

  // Базовий перехід вперед
  const handleNextCard = useCallback(() => {
    if (currentCards.length === 0) return;
    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
  }, [currentCards, currentCardIndex]);

  // Базовий перехід назад
  const handlePrevCard = useCallback(() => {
    if (currentCards.length === 0) return;
    setCurrentCardIndex((prev) =>
      prev > 0 ? prev - 1 : currentCards.length - 1,
    );
  }, [currentCards]);

  // Плавний перехід ВПЕРЕД (з урахуванням стану фліпу)
  const handleNextCardWithFlip = useCallback(
    (action?: () => void) => {
      if (isFlipped) {
        setIsFlipped(false);
        setTimeout(() => {
          action?.();
          handleNextCard();
        }, FLIP_DELAY_MS);
      } else {
        action?.();
        handleNextCard();
      }
    },
    [isFlipped, handleNextCard],
  );

  // Плавний перехід НАЗАД (з урахуванням стану фліпу)
  const handlePrevCardWithFlip = useCallback(
    (action?: () => void) => {
      if (isFlipped) {
        setIsFlipped(false);
        setTimeout(() => {
          action?.();
          handlePrevCard();
        }, FLIP_DELAY_MS);
      } else {
        action?.();
        handlePrevCard();
      }
    },
    [isFlipped, handlePrevCard],
  );

  // Перемішування карток
  const handleShuffleCards = () => {
    if (currentCards.length === 0) return;

    // Перемішуємо поточний (актуальний) список карток, а не весь activeDeck.cards
    const shuffled = [...currentCards].sort(() => Math.random() - 0.5);
    setIsFlipped(false);
    setCurrentCards(shuffled);
    setCurrentCardIndex(0);
    showToast(`${getTranslation(uiLanguage, "shuffle")} 🔀`);
  };

  // Позначення статусу (з перевіркою завершення всієї колоди для конфеті)
  const handleMarkStatus = useCallback(
    (status: "learning" | "known") => {
      if (!activeDeck || currentCards.length === 0) return;

      const card = currentCards[currentCardIndex];
      if (!card) return;

      const cardKey = `${activeDeck.id}_${card.id}`;
      const existing = progressMap[cardKey];

      const newProgress: CardProgress = {
        cardId: card.id,
        deckId: activeDeck.id,
        status,
        timesCorrect:
          (existing?.timesCorrect || 0) + (status === "known" ? 1 : 0),
        timesIncorrect:
          (existing?.timesIncorrect || 0) + (status === "learning" ? 1 : 0),
        starred: existing?.starred || false,
      };

      const updatedMap = saveCardProgress(newProgress);
      setProgressMap(updatedMap);

      if (status === "known") {
        const allKnown = activeDeck.cards.every((c) => {
          const key = `${activeDeck.id}_${c.id}`;
          return updatedMap[key]?.status === "known";
        });

        if (allKnown) {
          confetti({
            particleCount: 100,
            spread: 120,
            origin: { y: 0.6 },
          });
          showToast(`🏆 ${getTranslation(uiLanguage, "markedAsKnown")}!`);
        } else {
          showToast(`${getTranslation(uiLanguage, "markedAsKnown")} 🚀`);
        }
      }
    },
    [
      activeDeck,
      currentCards,
      currentCardIndex,
      progressMap,
      uiLanguage,
      setProgressMap,
      showToast,
    ],
  );

  const handleToggleStar = useCallback(() => {
    if (!activeDeck || currentCards.length === 0) return;
    const card = currentCards[currentCardIndex];
    if (!card) return;

    const cardKey = `${activeDeck.id}_${card.id}`;
    const existing = progressMap[cardKey];
    const newProgress: CardProgress = {
      cardId: card.id,
      deckId: activeDeck.id,
      status: existing?.status || "unseen",
      timesCorrect: existing?.timesCorrect || 0,
      timesIncorrect: existing?.timesIncorrect || 0,
      starred: !(existing?.starred || false),
    };

    const updatedMap = saveCardProgress(newProgress);
    setProgressMap(updatedMap);
    showToast(
      newProgress.starred
        ? getTranslation(uiLanguage, "addedFavorite")
        : getTranslation(uiLanguage, "removedFavorite"),
    );
  }, [
    activeDeck,
    currentCards,
    currentCardIndex,
    progressMap,
    uiLanguage,
    setProgressMap,
    showToast,
  ]);

  const toggleUnseenOnlyMode = useCallback(() => {
    if (!activeDeck) return;
    setIsUnseenOnlyMode((prev) => {
      const newState = !prev;
      if (newState) {
        showToast(getTranslation(uiLanguage, "modeUnseenOnly")); // "Тільки невивчені слова"
      } else {
        showToast(getTranslation(uiLanguage, "modeAllWords")); // "Всі слова колоди"
      }
      return newState;
    });
  }, [activeDeck, uiLanguage, showToast]);

  return {
    currentCards,
    currentCardIndex,
    studyMode,
    isFlipped,
    isUnseenOnlyMode,
    setIsFlipped,
    setCurrentCards,
    setCurrentCardIndex,
    setStudyMode,
    toggleUnseenOnlyMode,
    handleNextCard,
    handlePrevCard,
    handleNextCardWithFlip,
    handlePrevCardWithFlip,
    handleShuffleCards,
    handleMarkStatus,
    handleToggleStar,
  };
};
