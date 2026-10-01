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
      // На ПК p-4 md:p-8, а на телефоні max-sm:p-3 (менше відступів по краях)
      className={`absolute inset-0 w-full h-full rounded-3xl p-4 md:p-8 max-sm:p-3 flex flex-col justify-between rotate-y-180 backface-hidden overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-[#1e1f20] to-[#252729] text-gray-100"
          : "bg-gradient-to-br from-white to-blue-50/40 text-gray-800"
      }`}
    >
      {/* Top Back Info */}
      <div className="flex items-start justify-between gap-2">
        {/* max-sm:flex-wrap дозволить плашкам перенестись, якщо екран надто вузький */}
        <div className="flex flex-wrap items-center gap-2 max-sm:gap-1.5">
          <span className="px-2.5 py-0.5 max-sm:px-2 max-sm:py-1 rounded-full text-[11px] max-sm:text-[14px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            {getTranslation(uiLanguage, "backSide")}
          </span>
          {card.preposition && (
            <span className="px-2.5 py-0.5 max-sm:px-2 max-sm:py-1 rounded-full text-xs max-sm:text-[14px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700 animate-pulse flex items-center">
              {/* max-sm:hidden ховає довге слово на телефоні */}
              <span className="max-sm:hidden mr-1">
                {getTranslation(uiLanguage, "preposition")}
              </span>
              {card.preposition}
            </span>
          )}
        </div>

        <button
          onClick={onPlayAudio}
          className="p-2.5 max-sm:p-2 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors shrink-0"
          title={getTranslation(uiLanguage, "pronounce")}
        >
          <Volume2 className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
        </button>
      </div>

      {/* Central Back Details */}
      <div className="flex flex-col items-center justify-center text-center my-auto space-y-3 max-sm:space-y-1.5 px-2">
        {mode === "reverse" ? (
          // Reverse Back shows German word & prep
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              {card.article && (
                <span className="text-xl sm:text-2xl font-serif text-blue-600 dark:text-blue-400 italic">
                  {card.article}
                </span>
              )}
              <h3 className="text-2xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">
                {card.german}
              </h3>
            </div>
            {card.preposition && (
              <p className="text-base max-sm:text-sm font-semibold text-purple-600 dark:text-purple-400 mt-1 max-sm:mt-0">
                + {card.preposition}
              </p>
            )}
          </div>
        ) : (
          // Classic/Grammar Back shows localized translation
          <div>
            {deckType === "nouns" && (
              <div className="mb-2 max-sm:mb-1 flex items-center justify-center flex-wrap gap-1">
                <span className="text-lg max-sm:text-base text-blue-600 dark:text-blue-400 italic mr-2 max-sm:mr-0">
                  {card.article}
                </span>
                <span className="text-xl max-sm:text-lg font-bold text-gray-800 dark:text-gray-200">
                  {card.german}
                </span>
                {card.plural && (
                  <span className="text-sm max-sm:text-xs text-gray-500 ml-2 max-sm:ml-0">
                    ({card.plural})
                  </span>
                )}
              </div>
            )}

            {!isGermanUI && translation && (
              <h3 className="text-4xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 max-sm:px-1 break-words">
                {translation}
              </h3>
            )}
          </div>
        )}

        {/* Preposition & Grammar details */}
        {card.preposition && mode !== "reverse" && (
          // max-sm:flex-col розмістить конструкцію під іконкою, щоб зберегти горизонтальне місце
          <div className="inline-flex max-sm:flex-col items-center gap-1.5 max-sm:gap-0.5 px-4 max-sm:px-3 py-1.5 rounded-2xl max-sm:rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-sm max-sm:text-[14px] font-medium max-sm:mt-1 w-auto">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 max-sm:w-3 max-sm:h-3 text-purple-500 shrink-0" />
              <span className="max-sm:hidden">
                {getTranslation(uiLanguage, "preposition")}{" "}
              </span>
            </div>
            <strong className="font-bold text-purple-900 dark:text-purple-100">
              {card.german} + {card.preposition}
            </strong>
          </div>
        )}

        {/* Example sentence */}
        {card.exampleGerman && (
          <div className="mt-2 max-sm:mt-1 p-3 sm:p-4 max-sm:p-2.5 rounded-2xl bg-gray-50/80 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 max-w-md w-full">
            <p className="text-md sm:text-sm font-medium text-gray-800 dark:text-gray-200 italic">
              "{card.exampleGerman}"
            </p>
            {!isGermanUI && exampleTranslation && (
              <p className="text-xs max-sm:text-[12px] text-gray-500 dark:text-gray-400 mt-1 max-sm:mt-0.5">
                {exampleTranslation}
              </p>
            )}
          </div>
        )}

        {/* Notes / Grammar hint */}
        {notes && (
          <p className="text-xs max-sm:text-[12px] text-amber-600 dark:text-amber-400 font-medium">
            💡 {notes}
          </p>
        )}
      </div>

      {/* Bottom Flip back */}
      <div className="flex items-center justify-center gap-1.5 text-xs max-sm:text-[10px] text-gray-400 font-medium">
        <RotateCw className="w-3.5 h-3.5 max-sm:w-3 max-sm:h-3" />
        <span>{getTranslation(uiLanguage, "clickToFlip")}</span>
      </div>
    </div>
  );
};
