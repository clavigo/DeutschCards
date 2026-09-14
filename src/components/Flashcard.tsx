import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2, XCircle } from "lucide-react";

import { FlashcardFront } from "./FlashcardFront";
import { FlashcardBack } from "./FlashcardBack";

import { Flashcard as FlashcardType, StudyMode, DeckType } from "../types";
import { speakGerman } from "../utils/speech";
import {
  Language,
  getTranslation,
  getLocalizedText,
} from "../utils/translations";

interface FlashcardProps {
  card: FlashcardType;
  mode: StudyMode;
  deckType: DeckType;
  status?: "unseen" | "learning" | "known";
  isStarred?: boolean;
  isDarkMode: boolean;
  uiLanguage: Language;
  onMarkStatus: (status: "learning" | "known") => void;
  onToggleStar: () => void;
  onNext: () => void;
  onPrev: () => void;
}

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

export const Flashcard: React.FC<FlashcardProps> = ({
  card,
  mode,
  deckType,
  status = "unseen",
  isStarred = false,
  isDarkMode,
  uiLanguage,
  onMarkStatus,
  onToggleStar,
  onNext,
  onPrev,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isGermanUI = uiLanguage === "de";

  // Генеруємо тексти один раз тут, щоб не дублювати логіку в Front/Back
  const translation = getLocalizedText(card.translation, uiLanguage);
  const exampleTranslation = getLocalizedText(
    card.exampleTranslation,
    uiLanguage,
  );
  const notes = getLocalizedText(card.notes, uiLanguage);

  useEffect(() => {
    setIsFlipped(false);
  }, [card.id]);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakGerman(card.german);
  };

  // Збираємо спільні пропси для лицьової та зворотної сторін
  const faceProps: FlashcardFaceProps = {
    card,
    mode,
    deckType,
    isDarkMode,
    uiLanguage,
    isGermanUI,
    translation,
    exampleTranslation,
    notes,
    onPlayAudio: handlePlayAudio,
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 my-4 px-2">
      {/* Interactive 3D Card Container */}
      <div className="relative w-full">
        {/* Shadow Layers */}
        <div className="absolute inset-0 translate-y-2 scale-[0.97] rounded-3xl bg-gray-200/60 dark:bg-gray-800/40 border border-gray-300/40 dark:border-gray-700/30 transition-all duration-300 pointer-events-none" />
        <div className="absolute inset-0 translate-y-1 scale-[0.985] rounded-3xl bg-gray-100/80 dark:bg-gray-800/70 border border-gray-200/60 dark:border-gray-700/50 transition-all duration-300 pointer-events-none" />

        <div
          id="flashcard-container"
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[300px] perspective-1000 cursor-pointer group select-none"
        >
          <motion.div
            className={`relative w-full h-full rounded-3xl transition-all duration-500 transform-style-3d border ${
              isDarkMode ? "sleek-dark-shadow" : "sleek-card-shadow"
            }`}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
              borderColor: isDarkMode
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.08)",
              backgroundColor: isDarkMode ? "#1e1f20" : "#ffffff",
            }}
          >
            {/* Підключаємо компоненти сторін */}
            <FlashcardFront
              {...faceProps}
              status={status}
              isStarred={isStarred}
              onToggleStar={onToggleStar}
            />
            <FlashcardBack {...faceProps} />
          </motion.div>
        </div>
      </div>

      {/* Control Action Pills */}
      <div className="flex items-center justify-between w-full max-w-md gap-3">
        <button
          id="mark-learning-btn"
          onClick={() => {
            onMarkStatus("learning");
            onNext();
          }}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 font-medium text-xs sm:text-sm shadow-xs transition-all transform active:scale-95"
        >
          <XCircle className="w-4 h-4 text-rose-500" />
          <span>{getTranslation(uiLanguage, "stillLearning")}</span>
        </button>

        <button
          id="mark-known-btn"
          onClick={() => {
            onMarkStatus("known");
            onNext();
          }}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 font-medium text-xs sm:text-sm shadow-xs transition-all transform active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{getTranslation(uiLanguage, "iKnowThis")}</span>
        </button>
      </div>
    </div>
  );
};
