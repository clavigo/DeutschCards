import { useState } from "react";
import { Deck, CardProgress } from "../types";
import {
  getStoredDecks,
  saveUserDecks,
  getStoredProgress,
  getStoredPinned,
  savePinnedDecks,
  resetDeckProgress,
  importDataFromJSON,
} from "../utils/storage";
import { Language, getTranslation } from "../utils/translations";

interface DecksProps {
  uiLanguage: Language;
  showToast: (msg: string) => void;
  onDeckReset?: () => void;
}

export const useDecks = ({
  uiLanguage,
  showToast,
  onDeckReset,
}: DecksProps) => {
  // Main state
  const [decks, setDecks] = useState<Deck[]>(getStoredDecks);
  const [activeDeckId, setActiveDeckId] = useState<string>(() => {
    const storedDecks = getStoredDecks();
    return storedDecks.length > 0 ? storedDecks[0].id : "public_verbs_prep";
  });
  const [pinnedIds, setPinnedIds] = useState<string[]>(getStoredPinned);
  const [progressMap, setProgressMap] =
    useState<Record<string, CardProgress>>(getStoredProgress);

  // Active Deck object
  const activeDeck = decks.find((d) => d.id === activeDeckId) || decks[0];

  // Toggle Pin Status
  const handleTogglePin = (deckId: string) => {
    const updated = pinnedIds.includes(deckId)
      ? pinnedIds.filter((id) => id !== deckId)
      : [...pinnedIds, deckId];

    setPinnedIds(updated);
    savePinnedDecks(updated);
    showToast(
      pinnedIds.includes(deckId)
        ? getTranslation(uiLanguage, "deckUnpinned")
        : getTranslation(uiLanguage, "deckPinned"),
    );
  };

  // Save Created or Edited Deck
  const handleSaveDeck = (savedDeck: Deck) => {
    const existingIdx = decks.findIndex((d) => d.id === savedDeck.id);
    let updatedDecks: Deck[];

    if (existingIdx >= 0) {
      updatedDecks = [...decks];
      updatedDecks[existingIdx] = savedDeck;
    } else {
      updatedDecks = [...decks, savedDeck];
    }

    setDecks(updatedDecks);
    saveUserDecks(updatedDecks);
    setActiveDeckId(savedDeck.id);
    showToast(`${getTranslation(uiLanguage, "saveDeck")} ✨`);
  };

  // Delete Custom Deck
  const handleDeleteDeck = () => {
    if (!activeDeck || activeDeck.isPublic) return;
    if (
      window.confirm(
        `${getTranslation(uiLanguage, "deleteDeck")} "${activeDeck.title}"?`,
      )
    ) {
      const updated = decks.filter((d) => d.id !== activeDeck.id);
      setDecks(updated);
      saveUserDecks(updated);
      setActiveDeckId(updated.length > 0 ? updated[0].id : "");
      showToast(getTranslation(uiLanguage, "deleteDeck"));
    }
  };

  // Reset Progress for Deck
  const handleResetProgress = () => {
    if (!activeDeck) return;
    if (
      window.confirm(
        `${getTranslation(uiLanguage, "resetProgress")} "${activeDeck.title}"?`,
      )
    ) {
      const updated = resetDeckProgress(activeDeck.id);
      setProgressMap(updated);
      if (onDeckReset) onDeckReset();
      showToast(getTranslation(uiLanguage, "resetProgress"));
    }
  };

  // File Import Trigger
  const handleImportFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const text = await file.text();
        const res = importDataFromJSON(text);
        if (res.success) {
          setDecks(getStoredDecks());
          setProgressMap(getStoredProgress());
          setPinnedIds(getStoredPinned());
          showToast(res.message);
        } else {
          alert(res.message);
        }
      }
    };
    input.click();
  };

  return {
    decks,
    activeDeck,
    activeDeckId,
    setActiveDeckId,
    pinnedIds,
    progressMap,
    setProgressMap,
    handleTogglePin,
    handleSaveDeck,
    handleDeleteDeck,
    handleResetProgress,
    handleImportFile,
  };
};
