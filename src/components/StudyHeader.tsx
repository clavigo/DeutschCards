import React from "react";
import {
  Pin,
  Shuffle,
  RotateCcw,
  Edit3,
  Trash2,
  Menu,
  Layers,
  Sparkles,
  BookOpen,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";
import { Deck, StudyMode } from "../types";
import { Language, getTranslation } from "../utils/translations";

interface StudyHeaderProps {
  deck: Deck;
  currentCardIndex: number;
  totalCards: number;
  studyMode: StudyMode;
  isPinned: boolean;
  knownCount: number;
  learningCount: number;
  isDarkMode: boolean;
  uiLanguage: Language;
  onToggleSidebar: () => void;
  onChangeMode: (mode: StudyMode) => void;
  onTogglePin: () => void;
  onShuffle: () => void;
  onResetProgress: () => void;
  onEditDeck: () => void;
  onDeleteDeck: () => void;
}

export const StudyHeader: React.FC<StudyHeaderProps> = ({
  deck,
  currentCardIndex,
  totalCards,
  studyMode,
  isPinned,
  knownCount,
  learningCount,
  isDarkMode,
  uiLanguage,
  onToggleSidebar,
  onChangeMode,
  onTogglePin,
  onShuffle,
  onResetProgress,
  onEditDeck,
  onDeleteDeck,
}) => {
  const percentage =
    totalCards > 0 ? Math.round((knownCount / totalCards) * 100) : 0;

  return (
    <header className="w-full flex flex-col gap-4 mb-4">
      {/* Головний контейнер: flex-col на мобільних (щоб кнопки впали вниз), flex-row на md */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        {/* ЛІВА ГРУПА: Гамбургер + Іконка + Текст */}
        <div className="flex items-start md:items-center gap-3 flex-1 min-w-0">
          <button
            id="mobile-sidebar-toggle"
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors shrink-0 mt-0.5"
            title="Open Decks"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-start md:items-center gap-2.5 flex-1 min-w-0">
            <span className="text-2xl shrink-0 mt-0.5 md:mt-0">
              {deck.icon || "📘"}
            </span>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 truncate">
                  {deck.title}
                </h1>
                <button
                  onClick={onTogglePin}
                  className={`p-1 rounded-lg transition-colors shrink-0 ${
                    isPinned
                      ? "text-amber-500 fill-amber-500"
                      : "text-gray-400 hover:text-amber-500"
                  }`}
                  title={
                    isPinned
                      ? getTranslation(uiLanguage, "deckUnpinned")
                      : getTranslation(uiLanguage, "deckPinned")
                  }
                >
                  <Pin className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 md:mt-0.5 break-words md:line-clamp-1">
                {deck.description}
              </p>
            </div>
          </div>

          {/* ПРАВА ГРУПА: Кнопки управління */}
          <div className="flex items-center gap-1.5 self-end md:self-auto shrink-0">
            <button
              id="shuffle-deck-btn"
              onClick={onShuffle}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
              title={getTranslation(uiLanguage, "shuffle")}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              id="reset-progress-btn"
              onClick={onResetProgress}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
              title={getTranslation(uiLanguage, "resetProgress")}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {!deck.isPublic && (
            <>
              <button
                id="edit-deck-btn"
                onClick={onEditDeck}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                title={getTranslation(uiLanguage, "editDeck")}
              >
                <Edit3 className="w-4 h-4" />
              </button>

              <button
                id="delete-deck-btn"
                onClick={onDeleteDeck}
                className="p-2 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-950/60 text-rose-600 transition-colors"
                title={getTranslation(uiLanguage, "deleteDeck")}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mode Selector Pill Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-[#1e1f20] border border-gray-200/60 dark:border-gray-800">
        <button
          id="mode-classic-btn"
          onClick={() => onChangeMode("classic")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
            studyMode === "classic"
              ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-xs font-semibold"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{getTranslation(uiLanguage, "modeClassic")}</span>
        </button>

        <button
          id="mode-reverse-btn"
          onClick={() => onChangeMode("reverse")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
            studyMode === "reverse"
              ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{getTranslation(uiLanguage, "modeReverse")}</span>
        </button>

        <button
          id="mode-quiz-btn"
          onClick={() => onChangeMode("quiz")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
            studyMode === "quiz"
              ? "bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 shadow-xs font-semibold"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{getTranslation(uiLanguage, "modeQuiz")}</span>
        </button>
      </div>

      {/* Progress & Card Index Tracker */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
          <span>
            {getTranslation(uiLanguage, "cardCount", {
              current: totalCards > 0 ? currentCardIndex + 1 : 0,
              total: totalCards,
            })}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {knownCount}{" "}
              {getTranslation(uiLanguage, "learned")}
            </span>
            <span className="text-amber-500 font-semibold">
              {learningCount} {getTranslation(uiLanguage, "learning")}
            </span>
            <span className="font-bold text-gray-800 dark:text-gray-200">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Multi-segmented Progress bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{
              width: `${totalCards > 0 ? (knownCount / totalCards) * 100 : 0}%`,
            }}
          />
          <div
            className="bg-amber-400 h-full transition-all duration-300"
            style={{
              width: `${totalCards > 0 ? (learningCount / totalCards) * 100 : 0}%`,
            }}
          />
        </div>
      </div>
    </header>
  );
};
