import React from "react";
import { Volume2, RotateCw, Star, CheckCircle2 } from "lucide-react";
import { Flashcard as FlashcardType, StudyMode, DeckType } from "../types";
import { createClozeSentence } from "../utils/cloze";
import { Language, getTranslation } from "../utils/translations";

const getArticleBadge = (art?: string) => {
  if (!art) return null;
  switch (art.toLowerCase()) {
    case "der":
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
          der
        </span>
      );
    case "die":
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          die
        </span>
      );
    case "das":
      return (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          das
        </span>
      );
    default:
      return null;
  }
};

const getPartOfSpeechLabel = (
  pos: string | undefined,
  uiLanguage: Language,
) => {
  if (!pos) return null;
  switch (pos) {
    case "noun":
      return getTranslation(uiLanguage, "noun");
    case "verb":
      return getTranslation(uiLanguage, "verb");
    case "adjective":
      return getTranslation(uiLanguage, "adjective");
    case "phrase":
      return getTranslation(uiLanguage, "phrase");
    default:
      return getTranslation(uiLanguage, "other");
  }
};

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

interface FlashcardFrontProps extends FlashcardFaceProps {
  status: "unseen" | "learning" | "known";
  isStarred: boolean;
  onToggleStar: () => void;
}

export const FlashcardFront: React.FC<FlashcardFrontProps> = ({
  card,
  mode,
  deckType,
  isDarkMode,
  uiLanguage,
  isGermanUI,
  translation,
  notes,
  status,
  isStarred,
  onToggleStar,
  onPlayAudio,
}) => {
  // Для колоди іменників ховаємо артикль спереду, щоб користувач його згадував
  const showArticleOnFront = deckType !== "nouns";

  return (
    <div
      className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between backface-hidden overflow-hidden ${
        isDarkMode ? "bg-[#1e1f20] text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      {/* Top metadata & audio */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showArticleOnFront && card.article && getArticleBadge(card.article)}

          {card.partOfSpeech && (
            <span className="px-2.5 py-0.5 rounded-full text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 font-medium">
              {getPartOfSpeechLabel(card.partOfSpeech, uiLanguage)}
            </span>
          )}

          {status === "known" && (
            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3" />{" "}
              {getTranslation(uiLanguage, "learned")}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar();
            }}
            className={`p-2 rounded-full transition-colors ${
              isStarred
                ? "text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                : "text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            title={
              isStarred
                ? getTranslation(uiLanguage, "removedFavorite")
                : getTranslation(uiLanguage, "addedFavorite")
            }
          >
            <Star className={`w-5 h-5 ${isStarred ? "fill-current" : ""}`} />
          </button>

          {mode !== "reverse" && (
            <button
              onClick={onPlayAudio}
              className="p-2.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
              title={getTranslation(uiLanguage, "pronounce")}
            >
              <Volume2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Center Content depending on mode */}
      <div className="flex flex-col items-center justify-center text-center my-auto space-y-3 px-4">
        {mode === "reverse" ? (
          // Reverse Mode
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-400 font-medium block mb-2">
              {isGermanUI
                ? "Ergänze den Satz"
                : getTranslation(uiLanguage, "translationLabel")}
            </span>

            {isGermanUI ? (
              <div className="space-y-3">
                {card.exampleGerman ? (
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 italic leading-relaxed">
                    "{createClozeSentence(card.exampleGerman, card.german)}"
                  </h2>
                ) : (
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {notes || "Welches Wort passt?"}
                  </h2>
                )}

                {card.preposition && (
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    💡 Tipp: {card.preposition}
                  </div>
                )}
              </div>
            ) : (
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                {translation}
              </h2>
            )}
          </div>
        ) : (
          // Classic & Grammar Modes: Front shows German word
          <div>
            <div className="flex items-center justify-center gap-2 mb-1">
              {showArticleOnFront && card.article && (
                <span className="text-xl sm:text-3xl font-serif text-blue-600 dark:text-blue-400 italic">
                  {card.article}
                </span>
              )}
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                {card.german}
              </h2>
            </div>

            {showArticleOnFront && card.plural && (
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {getTranslation(uiLanguage, "plural")}{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {card.plural}
                </span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bottom flip hint */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 font-medium">
        <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
        <span>{getTranslation(uiLanguage, "clickToFlip")}</span>
      </div>
    </div>
  );
};
