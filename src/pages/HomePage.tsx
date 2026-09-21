import { useState, useEffect } from "react";
import { calculateDeckStats, exportDataAsJSON } from "../utils/storage";
import { Deck } from "../types";
import { Sidebar } from "../components/Sidebar";
import { StudyHeader } from "../components/StudyHeader";
import { Flashcard as FlashcardComponent } from "../components/Flashcard";
import { StudyModeQuiz } from "../components/StudyModeQuiz";
import { DeckEditorModal } from "../components/DeckEditorModal";
import { StatsModal } from "../components/StatsModal";
import { Language, getTranslation } from "../utils/translations";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  Plus,
} from "lucide-react";
import { useKeyboardShortcuts, useDecks, useStudySession } from "../hooks";

interface HomePageProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const HomePage = ({ isDarkMode, onToggleTheme }: HomePageProps) => {
  // UI Language State
  const [uiLanguage, setUiLanguage] = useState<Language>("uk");

  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [deckToEdit, setDeckToEdit] = useState<Deck | null>(null);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    decks,
    activeDeck,
    activeDeckId,
    pinnedIds,
    progressMap,
    setActiveDeckId,
    handleTogglePin,
    handleSaveDeck,
    handleDeleteDeck,
    setProgressMap,
    handleImportFile,
    handleResetProgress,
  } = useDecks({ uiLanguage, onDeckReset: () => setCurrentCardIndex(0) });

  const {
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
  } = useStudySession({
    activeDeck,
    progressMap,
    uiLanguage,
    setProgressMap,
  });

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

  // Підключаємо наш кастомний хук для клавіатури
  useKeyboardShortcuts({
    onNext: handleNextCard,
    onPrev: handlePrevCard,
    onMarkKnown: () => handleMarkStatus("known"),
    onMarkLearning: () => handleMarkStatus("learning"),
    isDisabled: isEditorOpen || isStatsOpen,
  });

  // Active card
  const currentCard = currentCards[currentCardIndex];
  const cardKey =
    activeDeck && currentCard ? `${activeDeck.id}_${currentCard.id}` : "";
  const currentProgress = progressMap[cardKey];

  // Stats calculation for current deck
  const stats = activeDeck
    ? calculateDeckStats(activeDeck, progressMap)
    : { total: 0, known: 0, learning: 0, unseen: 0, percentage: 0 };

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row font-sans transition-colors duration-300 ${
        isDarkMode ? "bg-[#131314] text-gray-100" : "bg-[#f8f9fa] text-gray-900"
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
        onToggleTheme={() => onToggleTheme()}
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
                  <h3 className="text-lg font-bold">
                    {getTranslation(uiLanguage, "emptyDeckNotice")}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 mb-4">
                    {getTranslation(uiLanguage, "emptyDeckPrompt")}
                  </p>
                  <button
                    onClick={() => {
                      setDeckToEdit(activeDeck);
                      setIsEditorOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 text-white font-medium text-xs shadow-md"
                  >
                    <Plus className="w-4 h-4" />{" "}
                    {getTranslation(uiLanguage, "addToList")}
                  </button>
                </div>
              ) : studyMode === "quiz" ? (
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
                  deckType={activeDeck.type || "basic"}
                  status={currentProgress?.status || "unseen"}
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
              {currentCards.length > 0 && studyMode !== "quiz" && (
                <div className="flex items-center justify-center gap-4 mt-2 mb-6">
                  <button
                    id="prev-card-btn"
                    onClick={handlePrevCard}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 font-medium text-xs shadow-xs transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      {getTranslation(uiLanguage, "prevWord")}
                    </span>
                  </button>

                  <span className="text-xs font-semibold text-gray-400">
                    {currentCardIndex + 1} / {currentCards.length}
                  </span>

                  <button
                    id="next-card-btn"
                    onClick={handleNextCard}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    <span>{getTranslation(uiLanguage, "nextWord")}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Fallback when no deck selected */
          <div className="text-center py-20">
            <h2 className="text-xl font-bold">
              {getTranslation(uiLanguage, "selectDeckPlaceholder")}
            </h2>
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
};
