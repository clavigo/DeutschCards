import React from 'react';
import { X, Award, CheckCircle2, BookOpen, Sparkles, BarChart2, Flame } from 'lucide-react';
import { Deck } from '../types';
import { calculateDeckStats } from '../utils/storage';
import { Language, getTranslation } from '../utils/translations';

interface StatsModalProps {
  decks: Deck[];
  progressMap: Record<string, any>;
  isDarkMode: boolean;
  uiLanguage: Language;
  onClose: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  decks,
  progressMap,
  isDarkMode,
  uiLanguage,
  onClose,
}) => {
  let totalCards = 0;
  let totalKnown = 0;
  let totalLearning = 0;

  const deckStatsList = decks.map((deck) => {
    const stats = calculateDeckStats(deck, progressMap);
    totalCards += stats.total;
    totalKnown += stats.known;
    totalLearning += stats.learning;
    return { deck, stats };
  });

  const totalPercentage = totalCards > 0 ? Math.round((totalKnown / totalCards) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div
        className={`w-full max-w-xl max-h-[85vh] flex flex-col rounded-3xl shadow-2xl border overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-[#1e1f20] text-gray-100 border-gray-800'
            : 'bg-white text-gray-900 border-gray-200'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/60 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{getTranslation(uiLanguage, 'statsTitle')}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {getTranslation(uiLanguage, 'statsSubtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Main Highlights Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-center">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                {getTranslation(uiLanguage, 'learned')}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">
                {totalKnown}
              </span>
              <span className="text-[10px] text-emerald-500 block">{getTranslation(uiLanguage, 'wordsCountSuffix')}</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-center">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 block mb-1">
                {getTranslation(uiLanguage, 'learning')}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 dark:text-amber-300">
                {totalLearning}
              </span>
              <span className="text-[10px] text-amber-500 block">{getTranslation(uiLanguage, 'wordsCountSuffix')}</span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 block mb-1">
                {getTranslation(uiLanguage, 'overallProgress')}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-300">
                {totalPercentage}%
              </span>
              <span className="text-[10px] text-blue-500 block">{getTranslation(uiLanguage, 'accuracySuffix')}</span>
            </div>
          </div>

          {/* Detailed Deck Breakdown */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              {getTranslation(uiLanguage, 'progressPerDeck')}
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {deckStatsList.map(({ deck, stats }) => (
                <div
                  key={deck.id}
                  className="p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40"
                >
                  <div className="flex items-center justify-between mb-1.5 text-xs font-medium">
                    <span className="flex items-center gap-1.5 text-gray-800 dark:text-gray-200">
                      <span>{deck.icon || '📘'}</span>
                      <span className="font-bold">{deck.title}</span>
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {stats.known}/{stats.total} {getTranslation(uiLanguage, 'wordsCountSuffix')} ({stats.percentage}%)
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden flex">
                    <div
                      className="bg-emerald-500 h-full transition-all"
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200/60 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-md"
          >
            {getTranslation(uiLanguage, 'close')}
          </button>
        </div>
      </div>
    </div>
  );
};
