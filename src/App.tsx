import React, { useState, useEffect, useCallback } from 'react';
import {
  getStoredDecks,
  saveUserDecks,
  getStoredProgress,
  saveCardProgress,
  getStoredPinned,
  savePinnedDecks,
  calculateDeckStats,
  resetDeckProgress,
  exportDataAsJSON,
  importDataFromJSON,
} from './utils/storage';
import { Deck, Flashcard, StudyMode, CardProgress } from './types';
import { Sidebar } from './components/Sidebar';
import { StudyHeader } from './components/StudyHeader';
import { Flashcard as FlashcardComponent } from './components/Flashcard';
import { StudyModeQuiz } from './components/StudyModeQuiz';
import { DeckEditorModal } from './components/DeckEditorModal';
import { StatsModal } from './components/StatsModal';
import { Language, getTranslation } from './utils/translations';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  BookOpen,
  Plus,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Pin
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Theme state (Dark/Light)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('deutschcards_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Default to Google Gemini styled dark canvas
  });

  // UI Language State
  const [uiLanguage, setUiLanguage] = useState<Language>('uk');

  // Main state
  const [decks, setDecks] = useState<Deck[]>(getStoredDecks);
  const [activeDeckId, setActiveDeckId] = useState<string>(() => {
    const storedDecks = getStoredDecks();
    return storedDecks.length > 0 ? storedDecks[0].id : 'public_verbs_prep';
  });
  const [pinnedIds, setPinnedIds] = useState<string[]>(getStoredPinned);
  const [progressMap, setProgressMap] = useState<Record<string, CardProgress>>(getStoredProgress);

  // Study state
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [studyMode, setStudyMode] = useState<StudyMode>('classic');
  const [currentCards, setCurrentCards] = useState<Flashcard[]>([]);

  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [deckToEdit, setDeckToEdit] = useState<Deck | null>(null);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync theme class with <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('deutschcards_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('deutschcards_theme', 'light');
    }
  }, [isDarkMode]);

  // Active Deck object
  const activeDeck = decks.find((d) => d.id === activeDeckId) || decks[0];

  // Set card stack when active deck changes
  useEffect(() => {
    if (activeDeck && activeDeck.cards) {
      setCurrentCards(activeDeck.cards);
      setCurrentCardIndex(0);
    } else {
      setCurrentCards([]);
      setCurrentCardIndex(0);
    }
  }, [activeDeckId, decks]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle Pin Status
  const handleTogglePin = (deckId: string) => {
    const updated = pinnedIds.includes(deckId)
      ? pinnedIds.filter((id) => id !== deckId)
      : [...pinnedIds, deckId];

    setPinnedIds(updated);
    savePinnedDecks(updated);
    showToast(pinnedIds.includes(deckId) ? getTranslation(uiLanguage, 'deckUnpinned') : getTranslation(uiLanguage, 'deckPinned'));
  };

  // Card Status Mark Handler (Known vs Learning)
  const handleMarkStatus = useCallback(
    (status: 'learning' | 'known') => {
      if (!activeDeck || currentCards.length === 0) return;

      const card = currentCards[currentCardIndex];
      if (!card) return;

      const cardKey = `${activeDeck.id}_${card.id}`;
      const existing = progressMap[cardKey];

      const newProgress: CardProgress = {
        cardId: card.id,
        deckId: activeDeck.id,
        status,
        timesCorrect: (existing?.timesCorrect || 0) + (status === 'known' ? 1 : 0),
        timesIncorrect: (existing?.timesIncorrect || 0) + (status === 'learning' ? 1 : 0),
        starred: existing?.starred || false,
      };

      const updatedMap = saveCardProgress(newProgress);
      setProgressMap(updatedMap);

      if (status === 'known') {
        showToast(`${getTranslation(uiLanguage, 'markedAsKnown')} 🚀`);
      }
    },
    [activeDeck, currentCards, currentCardIndex, progressMap, uiLanguage]
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
      status: existing?.status || 'unseen',
      timesCorrect: existing?.timesCorrect || 0,
      timesIncorrect: existing?.timesIncorrect || 0,
      starred: !(existing?.starred || false),
    };

    const updatedMap = saveCardProgress(newProgress);
    setProgressMap(updatedMap);
    showToast(newProgress.starred ? getTranslation(uiLanguage, 'addedFavorite') : getTranslation(uiLanguage, 'removedFavorite'));
  }, [activeDeck, currentCards, currentCardIndex, progressMap, uiLanguage]);

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
      showToast('🎉');
      setCurrentCardIndex(0);
    }
  }, [currentCards, currentCardIndex]);

  const handlePrevCard = useCallback(() => {
    if (currentCards.length === 0) return;
    setCurrentCardIndex((prev) => (prev > 0 ? prev - 1 : currentCards.length - 1));
  }, [currentCards]);

  // Shuffle Cards
  const handleShuffleCards = () => {
    if (!activeDeck) return;
    const shuffled = [...activeDeck.cards].sort(() => Math.random() - 0.5);
    setCurrentCards(shuffled);
    setCurrentCardIndex(0);
    showToast(`${getTranslation(uiLanguage, 'shuffle')} 🔀`);
  };

  // Reset Progress for Deck
  const handleResetProgress = () => {
    if (!activeDeck) return;
    if (window.confirm(`${getTranslation(uiLanguage, 'resetProgress')} "${activeDeck.title}"?`)) {
      const updated = resetDeckProgress(activeDeck.id);
      setProgressMap(updated);
      setCurrentCardIndex(0);
      showToast(getTranslation(uiLanguage, 'resetProgress'));
    }
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
    showToast(`${getTranslation(uiLanguage, 'saveDeck')} ✨`);
  };

  // Delete Custom Deck
  const handleDeleteDeck = () => {
    if (!activeDeck || activeDeck.isPublic) return;
    if (window.confirm(`${getTranslation(uiLanguage, 'deleteDeck')} "${activeDeck.title}"?`)) {
      const updated = decks.filter((d) => d.id !== activeDeck.id);
      setDecks(updated);
      saveUserDecks(updated);
      setActiveDeckId(updated.length > 0 ? updated[0].id : '');
      showToast(getTranslation(uiLanguage, 'deleteDeck'));
    }
  };

  // File Import Trigger
  const handleImportFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
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

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts inside text inputs or modals
      if (
        isEditorOpen ||
        isStatsOpen ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
      ) {
        return;
      }

      if (e.code === 'ArrowRight') {
        handleNextCard();
      } else if (e.code === 'ArrowLeft') {
        handlePrevCard();
      } else if (e.code === 'ArrowUp') {
        handleMarkStatus('known');
      } else if (e.code === 'ArrowDown') {
        handleMarkStatus('learning');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextCard, handlePrevCard, handleMarkStatus, isEditorOpen, isStatsOpen]);

  // Active card
  const currentCard = currentCards[currentCardIndex];
  const cardKey = activeDeck && currentCard ? `${activeDeck.id}_${currentCard.id}` : '';
  const currentProgress = progressMap[cardKey];

  // Stats calculation for current deck
  const stats = activeDeck
    ? calculateDeckStats(activeDeck, progressMap)
    : { total: 0, known: 0, learning: 0, unseen: 0, percentage: 0 };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-300 ${
        isDarkMode ? 'bg-[#131314] text-gray-100' : 'bg-[#f8f9fa] text-gray-900'
      }`}
    >
      {/* Toast Notification Floating Pill */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xl text-xs font-medium border border-gray-700/50 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Sidebar (Google Gemini Styled) */}
      <Sidebar
        decks={decks}
        activeDeckId={activeDeckId}
        pinnedIds={pinnedIds}
        progressMap={progressMap}
        isDarkMode={isDarkMode}
        isOpen={isSidebarOpen}
        uiLanguage={uiLanguage}
        onLanguageChange={setUiLanguage}
        onSelectDeck={(deckId) => setActiveDeckId(deckId)}
        onTogglePin={handleTogglePin}
        onCreateDeck={() => {
          setDeckToEdit(null);
          setIsEditorOpen(true);
        }}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenStats={() => setIsStatsOpen(true)}
        onExportData={exportDataAsJSON}
        onImportData={handleImportFile}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Central Content Area */}
      <main className="flex-1 flex flex-col min-w-0 max-w-5xl mx-auto px-4 py-6 sm:px-8 overflow-x-hidden">
        {activeDeck ? (
          <>
            {/* Study Header & Mode Selectors */}
            <StudyHeader
              deck={activeDeck}
              currentCardIndex={currentCardIndex}
              totalCards={currentCards.length}
              studyMode={studyMode}
              isPinned={pinnedIds.includes(activeDeck.id)}
              knownCount={stats.known}
              learningCount={stats.learning}
              isDarkMode={isDarkMode}
              uiLanguage={uiLanguage}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              onChangeMode={(mode) => setStudyMode(mode)}
              onTogglePin={() => handleTogglePin(activeDeck.id)}
              onShuffle={handleShuffleCards}
              onResetProgress={handleResetProgress}
              onEditDeck={() => {
                setDeckToEdit(activeDeck);
                setIsEditorOpen(true);
              }}
              onDeleteDeck={handleDeleteDeck}
            />

            {/* Flashcard Canvas or Interactive Quiz View */}
            <div className="flex-1 flex flex-col items-center justify-center my-auto">
              {currentCards.length === 0 ? (
                /* Empty deck placeholder */
                <div className="text-center py-12 px-6 rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 my-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold">{getTranslation(uiLanguage, 'emptyDeckNotice')}</h3>
                  <p className="text-xs text-gray-400 mt-1 mb-4">
                    {getTranslation(uiLanguage, 'emptyDeckPrompt')}
                  </p>
                  <button
                    onClick={() => {
                      setDeckToEdit(activeDeck);
                      setIsEditorOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 text-white font-medium text-xs shadow-md"
                  >
                    <Plus className="w-4 h-4" /> {getTranslation(uiLanguage, 'addToList')}
                  </button>
                </div>
              ) : studyMode === 'quiz' ? (
                /* Interactive Quiz / Practice View */
                <StudyModeQuiz
                  cards={currentCards}
                  currentCardIndex={currentCardIndex}
                  isDarkMode={isDarkMode}
                  uiLanguage={uiLanguage}
                  onMarkStatus={handleMarkStatus}
                  onNext={handleNextCard}
                />
              ) : currentCard ? (
                /* Interactive 3D Flashcard View */
                <FlashcardComponent
                  card={currentCard}
                  mode={studyMode}
                  status={currentProgress?.status || 'unseen'}
                  isStarred={currentProgress?.starred || false}
                  isDarkMode={isDarkMode}
                  uiLanguage={uiLanguage}
                  onMarkStatus={handleMarkStatus}
                  onToggleStar={handleToggleStar}
                  onNext={handleNextCard}
                  onPrev={handlePrevCard}
                />
              ) : null}

              {/* Navigation Controls Bar */}
              {currentCards.length > 0 && studyMode !== 'quiz' && (
                <div className="flex items-center justify-center gap-4 mt-2 mb-6">
                  <button
                    id="prev-card-btn"
                    onClick={handlePrevCard}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-medium text-xs shadow-xs transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">{getTranslation(uiLanguage, 'prevWord')}</span>
                  </button>

                  <span className="text-xs font-semibold text-gray-400">
                    {currentCardIndex + 1} / {currentCards.length}
                  </span>

                  <button
                    id="next-card-btn"
                    onClick={handleNextCard}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    <span>{getTranslation(uiLanguage, 'nextWord')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Fallback when no deck selected */
          <div className="text-center py-20">
            <h2 className="text-xl font-bold">{getTranslation(uiLanguage, 'selectDeckPlaceholder')}</h2>
          </div>
        )}
      </main>

      {/* Modals */}
      {isEditorOpen && (
        <DeckEditorModal
          deckToEdit={deckToEdit}
          isDarkMode={isDarkMode}
          uiLanguage={uiLanguage}
          onSave={handleSaveDeck}
          onClose={() => {
            setIsEditorOpen(false);
            setDeckToEdit(null);
          }}
        />
      )}

      {isStatsOpen && (
        <StatsModal
          decks={decks}
          progressMap={progressMap}
          isDarkMode={isDarkMode}
          uiLanguage={uiLanguage}
          onClose={() => setIsStatsOpen(false)}
        />
      )}
    </div>
  );
}
