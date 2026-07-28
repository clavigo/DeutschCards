import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { Flashcard } from '../types';
import { speakGerman } from '../utils/speech';
import { Language, getTranslation } from '../utils/translations';
import confetti from 'canvas-confetti';

interface StudyModeQuizProps {
  cards: Flashcard[];
  currentCardIndex: number;
  isDarkMode: boolean;
  uiLanguage: Language;
  onMarkStatus: (status: 'learning' | 'known') => void;
  onNext: () => void;
}

export const StudyModeQuiz: React.FC<StudyModeQuizProps> = ({
  cards,
  currentCardIndex,
  isDarkMode,
  uiLanguage,
  onMarkStatus,
  onNext,
}) => {
  const currentCard = cards[currentCardIndex];
  const [typedAnswer, setTypedAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [quizType, setQuizType] = useState<'multiple' | 'input'>('multiple');

  // Generate 4 options for multiple choice
  useEffect(() => {
    if (!currentCard) return;

    setTypedAnswer('');
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);

    // Create distractor options from other cards
    const otherCards = cards.filter((c) => c.id !== currentCard.id);
    const shuffledOthers = [...otherCards].sort(() => Math.random() - 0.5);
    const distractors = shuffledOthers.slice(0, 3).map((c) => c.german);

    const allOptions = [currentCard.german, ...distractors].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  }, [currentCardIndex, cards]);

  if (!currentCard) {
    return (
      <div className="text-center py-12 text-gray-500">
        {getTranslation(uiLanguage, 'emptyDeckNotice')}
      </div>
    );
  }

  // Handle German character insertion
  const handleInsertChar = (char: string) => {
    setTypedAnswer((prev) => prev + char);
  };

  // Check Answer Handler
  const handleCheckMultipleChoice = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const correct = option.trim().toLowerCase() === currentCard.german.trim().toLowerCase();
    setIsCorrect(correct);

    speakGerman(currentCard.german);

    if (correct) {
      onMarkStatus('known');
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.7 },
      });
    } else {
      onMarkStatus('learning');
    }
  };

  const handleCheckTypedAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAnswered || !typedAnswer.trim()) return;

    setIsAnswered(true);

    // Flexible matching: ignore extra spaces, case, optional article
    const normalizedTarget = currentCard.german.trim().toLowerCase();
    const normalizedInput = typedAnswer.trim().toLowerCase();

    const correct =
      normalizedInput === normalizedTarget ||
      (currentCard.article &&
        `${currentCard.article.toLowerCase()} ${normalizedTarget}` === normalizedInput);

    setIsCorrect(correct);
    speakGerman(currentCard.german);

    if (correct) {
      onMarkStatus('known');
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.7 },
      });
    } else {
      onMarkStatus('learning');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto my-4 p-6 sm:p-8 rounded-3xl border shadow-lg bg-white dark:bg-[#1e1f20] border-gray-200 dark:border-gray-800">
      {/* Quiz Format Switcher */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          {getTranslation(uiLanguage, 'quizTitle')}
        </span>

        <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <button
            onClick={() => setQuizType('multiple')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              quizType === 'multiple'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-gray-500'
            }`}
          >
            {getTranslation(uiLanguage, 'multipleChoice')}
          </button>
          <button
            onClick={() => setQuizType('input')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              quizType === 'input'
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-gray-500'
            }`}
          >
            {getTranslation(uiLanguage, 'textInput')}
          </button>
        </div>
      </div>

      {/* Prompt Card */}
      <div className="text-center py-6 px-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 mb-6 border border-gray-100 dark:border-gray-800">
        <span className="text-xs text-gray-400 uppercase tracking-wider block mb-1">
          {getTranslation(uiLanguage, 'howToSayInGerman')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {currentCard.translation}
        </h2>
        {currentCard.preposition && (
          <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mt-2">
            💡 {getTranslation(uiLanguage, 'prepositionHintLabel')} "{currentCard.preposition}"
          </p>
        )}
      </div>

      {/* Format A: Multiple Choice */}
      {quizType === 'multiple' && (
        <div className="grid grid-cols-1 gap-3 mb-6">
          {options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isRightAnswer = option === currentCard.german;

            let buttonStyle = isDarkMode
              ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-200'
              : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800';

            if (isAnswered) {
              if (isRightAnswer) {
                buttonStyle =
                  'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
              } else if (isSelected && !isRightAnswer) {
                buttonStyle =
                  'bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-800 dark:text-rose-200 font-bold';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleCheckMultipleChoice(option)}
                disabled={isAnswered}
                className={`w-full p-4 text-left rounded-2xl border text-sm sm:text-base font-medium transition-all flex items-center justify-between ${buttonStyle}`}
              >
                <span>{option}</span>
                {isAnswered && isRightAnswer && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                {isAnswered && isSelected && !isRightAnswer && <XCircle className="w-5 h-5 text-rose-600" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Format B: Text Input */}
      {quizType === 'input' && (
        <form onSubmit={handleCheckTypedAnswer} className="space-y-4 mb-6">
          <div className="relative">
            <input
              type="text"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              disabled={isAnswered}
              placeholder={getTranslation(uiLanguage, 'inputPlaceholder')}
              className={`w-full p-4 rounded-2xl border text-lg outline-none transition-all ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200'
                    : 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-200'
                  : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:bg-gray-800'
              }`}
            />
          </div>

          {/* German Umlaut Quick Insertion Bar */}
          {!isAnswered && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{getTranslation(uiLanguage, 'germanCharacters')}</span>
              {['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map((char) => (
                <button
                  key={char}
                  type="button"
                  onClick={() => handleInsertChar(char)}
                  className="px-2.5 py-1 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold text-sm transition-colors"
                >
                  {char}
                </button>
              ))}
            </div>
          )}

          {!isAnswered && (
            <button
              type="submit"
              disabled={!typedAnswer.trim()}
              className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-md"
            >
              {getTranslation(uiLanguage, 'checkAnswer')}
            </button>
          )}
        </form>
      )}

      {/* Answer Feedback & Explanation */}
      {isAnswered && (
        <div className="space-y-4 pt-2">
          <div
            className={`p-4 rounded-2xl border ${
              isCorrect
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 text-rose-800 dark:text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-base mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{getTranslation(uiLanguage, 'correctFeedback')}</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>{getTranslation(uiLanguage, 'incorrectFeedback')}</span>
                </>
              )}
            </div>

            <p className="text-sm">
              {getTranslation(uiLanguage, 'correctWordWas')}{' '}
              <strong className="font-bold underline">{currentCard.german}</strong>
              {currentCard.article && ` (${currentCard.article})`}
            </p>

            {currentCard.exampleGerman && (
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 italic">
                "{currentCard.exampleGerman}" ({currentCard.exampleTranslation})
              </p>
            )}
          </div>

          <button
            onClick={onNext}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md transition-all"
          >
            <span>{getTranslation(uiLanguage, 'nextWord')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
