import React from "react";
import { Volume2, RotateCw, Sparkles } from "lucide-react";
import { Flashcard as FlashcardType, StudyMode, DeckType } from "../types";
import { Language, getTranslation } from "../utils/translations";

interface FlashcardFaceProps {
  card: FlashcardType;
  mode: StudyMode;
  deckType: DeckType;
  isDarkMode: boolean;
  uiLanguage: Language;
  isGermanUI: boolean;
  translation: string;
  exampleTranslation: string;
  notes: string;
  onPlayAudio: (e: React.MouseEvent) => void;
}

export const FlashcardBack: React.FC<FlashcardFaceProps> = ({
  card,
  mode,
  deckType,
  isDarkMode,
  uiLanguage,
  isGermanUI,
  translation,
  exampleTranslation,
  notes,
  onPlayAudio,
}) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full rounded-3xl p-3.5 sm:p-6 md:p-8 flex flex-col justify-between rotate-y-180 backface-hidden overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-[#1e1f20] to-[#252729] text-gray-100"
          : "bg-gradient-to-br from-white to-blue-50/40 text-gray-800"
      }`}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg) translateZ(0)", // зверніть увагу на rotateY(180deg) разом із translateZ
      }}
    >
      {/* Top Back Info */}
      <div className="flex items-start justify-between gap-2 w-full">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shrink-0">
            {getTranslation(uiLanguage, "backSide")}
          </span>

          {card.preposition && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700 animate-pulse flex items-center shrink-0">
              <span className="hidden sm:inline mr-1">
                {getTranslation(uiLanguage, "preposition")}
              </span>
              {card.preposition}
            </span>
          )}
        </div>

        <button
          onClick={onPlayAudio}
          className="p-2 sm:p-2.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors shrink-0"
          title={getTranslation(uiLanguage, "pronounce")}
        >
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Central Back Details */}
      <div className="flex flex-col items-center justify-center text-center my-auto space-y-2 sm:space-y-3 px-2 w-full max-w-full">
        {mode === "reverse" ? (
          /* Режим реверсу: показуємо німецьке слово */
          <div className="w-full">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1">
              {card.article && (
                <span className="text-lg sm:text-2xl font-serif text-blue-600 dark:text-blue-400 italic">
                  {card.article}
                </span>
              )}
              <h3 className="text-2xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 leading-tight break-words">
                {card.german}
              </h3>
            </div>
            {card.preposition && (
              <p className="text-sm sm:text-base font-semibold text-purple-600 dark:text-purple-400">
                + {card.preposition}
              </p>
            )}
          </div>
        ) : (
          /* Класичний режим: показуємо переклад */
          <div className="w-full">
            {deckType === "nouns" && (
              <div className="mb-1.5 flex items-center justify-center flex-wrap gap-1 text-sm sm:text-base">
                <span className="text-blue-600 dark:text-blue-400 italic">
                  {card.article}
                </span>
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {card.german}
                </span>
                {card.plural && (
                  <span className="text-xs text-gray-500">({card.plural})</span>
                )}
              </div>
            )}

            {!isGermanUI && translation && (
              <h3 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-none break-words px-1">
                {translation}
              </h3>
            )}
          </div>
        )}

        {/* Preposition & Grammar details */}
        {card.preposition && mode !== "reverse" && (
          <div className="inline-flex max-sm:flex-col items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 rounded-xl sm:rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs sm:text-sm font-medium w-auto max-w-full">
            <div className="flex items-center gap-1.5 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />
              <span className="hidden sm:inline">
                {getTranslation(uiLanguage, "preposition")}
              </span>
            </div>
            <strong className="font-bold text-purple-900 dark:text-purple-100 truncate">
              {card.german} + {card.preposition}
            </strong>
          </div>
        )}

        {/* Example sentence */}
        {card.exampleGerman && (
          <div className="mt-1 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-gray-50/80 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 w-full max-w-md">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 italic leading-snug break-words">
              "{card.exampleGerman}"
            </p>
            {!isGermanUI && exampleTranslation && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-tight break-words">
                {exampleTranslation}
              </p>
            )}
          </div>
        )}

        {/* Notes / Grammar hint */}
        {notes && (
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium leading-tight px-1">
            💡 {notes}
          </p>
        )}
      </div>

      {/* Bottom Flip back */}
      <div className="flex items-center justify-center gap-1 text-xs text-gray-400 font-medium">
        <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span>{getTranslation(uiLanguage, "clickToFlip")}</span>
      </div>
    </div>
  );
};
