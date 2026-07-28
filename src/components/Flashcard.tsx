import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, RotateCw, Star, CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';
import { Flashcard as FlashcardType, StudyMode } from '../types';
import { speakGerman } from '../utils/speech';
import { Language, getTranslation } from '../utils/translations';

interface FlashcardProps {
  card: FlashcardType;
  mode: StudyMode;
  status?: 'unseen' | 'learning' | 'known';
  isStarred?: boolean;
  isDarkMode: boolean;
  uiLanguage: Language;
  onMarkStatus: (status: 'learning' | 'known') => void;
  onToggleStar: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({
  card,
  mode,
  status = 'unseen',
  isStarred = false,
  isDarkMode,
  uiLanguage,
  onMarkStatus,
  onToggleStar,
  onNext,
  onPrev,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip status when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [card.id]);

  // Audio Handler
  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    speakGerman(card.german);
  };

  // Get article color badge
  const getArticleBadge = (art?: string) => {
    if (!art) return null;
    switch (art.toLowerCase()) {
      case 'der':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            der
          </span>
        );
      case 'die':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            die
          </span>
        );
      case 'das':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            das
          </span>
        );
      default:
        return null;
    }
  };

  const getPartOfSpeechLabel = (pos?: string) => {
    if (!pos) return null;
    switch (pos) {
      case 'noun':
        return getTranslation(uiLanguage, 'noun');
      case 'verb':
        return getTranslation(uiLanguage, 'verb');
      case 'adjective':
        return getTranslation(uiLanguage, 'adjective');
      case 'phrase':
        return getTranslation(uiLanguage, 'phrase');
      default:
        return getTranslation(uiLanguage, 'other');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6 my-4 px-2">
      {/* Interactive 3D Card Container with Sleek Stack Backing Layers */}
      <div className="relative w-full">
        {/* Card Backing Stack Layers */}
        <div className="absolute inset-0 translate-y-2 scale-[0.97] rounded-3xl bg-gray-200/60 dark:bg-gray-800/40 border border-gray-300/40 dark:border-gray-700/30 transition-all duration-300 pointer-events-none" />
        <div className="absolute inset-0 translate-y-1 scale-[0.985] rounded-3xl bg-gray-100/80 dark:bg-gray-800/70 border border-gray-200/60 dark:border-gray-700/50 transition-all duration-300 pointer-events-none" />

        <div
          id="flashcard-container"
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[300px] perspective-1000 cursor-pointer group select-none"
        >
          <motion.div
            className={`relative w-full h-full rounded-3xl transition-all duration-500 transform-style-3d border ${
              isDarkMode ? 'sleek-dark-shadow' : 'sleek-card-shadow'
            }`}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              backgroundColor: isDarkMode ? '#1e1f20' : '#ffffff',
            }}
          >
          {/* ================= FRONT SIDE ================= */}
          <div
            className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between backface-hidden overflow-hidden ${
              isDarkMode ? 'bg-[#1e1f20] text-gray-100' : 'bg-white text-gray-800'
            }`}
          >
            {/* Top metadata & audio */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {card.article && getArticleBadge(card.article)}

                {card.partOfSpeech && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 font-medium">
                    {getPartOfSpeechLabel(card.partOfSpeech)}
                  </span>
                )}

                {status === 'known' && (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> {getTranslation(uiLanguage, 'learned')}
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
                      ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                      : 'text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title={isStarred ? getTranslation(uiLanguage, 'removedFavorite') : getTranslation(uiLanguage, 'addedFavorite')}
                >
                  <Star className={`w-5 h-5 ${isStarred ? 'fill-current' : ''}`} />
                </button>

                {mode !== 'reverse' && (
                  <button
                    onClick={handlePlayAudio}
                    className="p-2.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
                    title={getTranslation(uiLanguage, 'pronounce')}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Center Content depending on mode */}
            <div className="flex flex-col items-center justify-center text-center my-auto space-y-3 px-4">
              {mode === 'reverse' ? (
                // Reverse Mode: Front shows translation
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-400 font-medium block mb-2">
                    {getTranslation(uiLanguage, 'translationLabel')}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    {card.translation}
                  </h2>
                </div>
              ) : (
                // Classic & Grammar Modes: Front shows German word
                <div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {card.article && (
                      <span className="text-xl sm:text-3xl font-serif text-blue-600 dark:text-blue-400 italic">
                        {card.article}
                      </span>
                    )}
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
                      {card.german}
                    </h2>
                  </div>

                  {card.plural && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {getTranslation(uiLanguage, 'plural')} <span className="text-blue-600 dark:text-blue-400">{card.plural}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom flip hint */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 font-medium">
              <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
              <span>{getTranslation(uiLanguage, 'clickToFlip')}</span>
            </div>
          </div>

          {/* ================= BACK SIDE ================= */}
          <div
            className={`absolute inset-0 w-full h-full rounded-3xl p-6 sm:p-8 flex flex-col justify-between rotate-y-180 backface-hidden overflow-hidden ${
              isDarkMode
                ? 'bg-gradient-to-br from-[#1e1f20] to-[#252729] text-gray-100'
                : 'bg-gradient-to-br from-white to-blue-50/40 text-gray-800'
            }`}
          >
            {/* Top Back Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                  {getTranslation(uiLanguage, 'backSide')}
                </span>
                {card.preposition && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-700 animate-pulse">
                    {getTranslation(uiLanguage, 'preposition')} {card.preposition}
                  </span>
                )}
              </div>

              <button
                onClick={handlePlayAudio}
                className="p-2.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                title={getTranslation(uiLanguage, 'pronounce')}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Central Back Details */}
            <div className="flex flex-col items-center justify-center text-center my-auto space-y-3 px-2">
              {mode === 'reverse' ? (
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
                    <p className="text-base font-semibold text-purple-600 dark:text-purple-400 mt-1">
                      + {card.preposition}
                    </p>
                  )}
                </div>
              ) : (
                // Classic/Grammar Back shows translation
                <div>
                  <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                    {card.translation}
                  </h3>
                </div>
              )}

              {/* Preposition & Grammar details */}
              {card.preposition && mode !== 'reverse' && (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>{getTranslation(uiLanguage, 'preposition')} </span>
                  <strong className="font-bold text-purple-900 dark:text-purple-100">
                    {card.german} + {card.preposition}
                  </strong>
                </div>
              )}

              {/* Example sentence */}
              {card.exampleGerman && (
                <div className="mt-2 p-3 sm:p-4 rounded-2xl bg-gray-50/80 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 max-w-md">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 italic">
                    "{card.exampleGerman}"
                  </p>
                  {card.exampleTranslation && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {card.exampleTranslation}
                    </p>
                  )}
                </div>
              )}

              {/* Notes / Grammar hint */}
              {card.notes && (
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  💡 {card.notes}
                </p>
              )}
            </div>

            {/* Bottom Flip back */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium">
              <RotateCw className="w-3.5 h-3.5" />
              <span>{getTranslation(uiLanguage, 'clickToFlip')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

      {/* Control Action Pills (Below Card) */}
      <div className="flex items-center justify-between w-full max-w-md gap-3">
        <button
          id="mark-learning-btn"
          onClick={() => {
            onMarkStatus('learning');
            onNext();
          }}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 font-medium text-xs sm:text-sm shadow-xs transition-all transform active:scale-95"
        >
          <XCircle className="w-4 h-4 text-rose-500" />
          <span>{getTranslation(uiLanguage, 'stillLearning')}</span>
        </button>

        <button
          id="mark-known-btn"
          onClick={() => {
            onMarkStatus('known');
            onNext();
          }}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 font-medium text-xs sm:text-sm shadow-xs transition-all transform active:scale-95"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{getTranslation(uiLanguage, 'iKnowThis')}</span>
        </button>
      </div>
    </div>
  );
};
