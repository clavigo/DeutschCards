import { useState, useCallback, Dispatch, SetStateAction } from "react";
import { saveCardProgress } from "../utils/storage";
import { Deck, Flashcard, StudyMode, CardProgress } from "../types";
import { Language, getTranslation } from "../utils/translations";
import confetti from "canvas-confetti";

interface StudySessionProps {
  activeDeck: Deck;
  progressMap: Record<string, CardProgress>;
  uiLanguage: Language;
  setProgressMap: Dispatch<SetStateAction<Record<string, CardProgress>>>;
  showToast: (msg: string) => void;
  // saveCardProgress: () => void;
}

export const useStudySession = ({
  activeDeck,
  progressMap,
  uiLanguage,
  setProgressMap,
  showToast,
}: StudySessionProps) => {
  // Study state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [studyMode, setStudyMode] = useState<StudyMode>("classic");
  const [currentCards, setCurrentCards] = useState<Flashcard[]>([]);

  // Card Navigation
  const handleNextCard = useCallback(() => {
    if (currentCards.length === 0) return;

    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      // Reached end of deck celebration
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
      });
      showToast("🎉");
      setCurrentCardIndex(0);
    }
  }, [currentCards, currentCardIndex]);

  const handlePrevCard = useCallback(() => {
    if (currentCards.length === 0) return;
    setCurrentCardIndex((prev) =>
      prev > 0 ? prev - 1 : currentCards.length - 1,
    );
  }, [currentCards]);

  // Shuffle Cards
  const handleShuffleCards = () => {
    if (!activeDeck) return;
    const shuffled = [...activeDeck.cards].sort(() => Math.random() - 0.5);
    setCurrentCards(shuffled);
    setCurrentCardIndex(0);
    showToast(`${getTranslation(uiLanguage, "shuffle")} 🔀`);
  };

  // Card Status Mark Handler (Known vs Learning)
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
        showToast(`${getTranslation(uiLanguage, "markedAsKnown")} 🚀`);
      }
    },
    [activeDeck, currentCards, currentCardIndex, progressMap, uiLanguage],
  );

  // Toggle Starred Card
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
  }, [activeDeck, currentCards, currentCardIndex, progressMap, uiLanguage]);

  return {
    currentCards,
    currentCardIndex,
    studyMode,
    setCurrentCards,
    setCurrentCardIndex,
    setStudyMode,
    handleNextCard,
    handlePrevCard,
    handleShuffleCards,
    handleMarkStatus,
    handleToggleStar,
  };
};
