import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit2, Upload, Sparkles, Save, BookOpen, Layers } from 'lucide-react';
import { Deck, Flashcard } from '../types';
import { Language, getTranslation } from '../utils/translations';

interface DeckEditorModalProps {
  deckToEdit: Deck | null; // null if creating a new deck
  isDarkMode: boolean;
  uiLanguage: Language;
  onSave: (deck: Deck) => void;
  onClose: () => void;
}

export const DeckEditorModal: React.FC<DeckEditorModalProps> = ({
  deckToEdit,
  isDarkMode,
  uiLanguage,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Мої списки');
  const [icon, setIcon] = useState('📙');
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [activeTab, setActiveTab] = useState<'cards' | 'bulk'>('cards');
  const [bulkText, setBulkText] = useState('');

  // Single card form inputs
  const [german, setGerman] = useState('');
  const [translation, setTranslation] = useState('');
  const [article, setArticle] = useState<'der' | 'die' | 'das' | ''>('');
  const [preposition, setPreposition] = useState('');
  const [exampleGerman, setExampleGerman] = useState('');
  const [exampleTranslation, setExampleTranslation] = useState('');
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  useEffect(() => {
    if (deckToEdit) {
      setTitle(deckToEdit.title);
      setDescription(deckToEdit.description);
      setCategory(deckToEdit.category || 'Мої списки');
      setIcon(deckToEdit.icon || '📙');
      setCards(deckToEdit.cards || []);
    } else {
      setTitle('');
      setDescription('');
      setCategory('Мої списки');
      setIcon('📙');
      setCards([]);
    }
  }, [deckToEdit]);

  // Add or Update single card
  const handleAddOrUpdateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!german.trim() || !translation.trim()) return;

    if (editingCardId) {
      setCards((prev) =>
        prev.map((c) =>
          c.id === editingCardId
            ? {
                ...c,
                german: german.trim(),
                translation: translation.trim(),
                article,
                preposition: preposition.trim(),
                exampleGerman: exampleGerman.trim(),
                exampleTranslation: exampleTranslation.trim(),
              }
            : c
        )
      );
      setEditingCardId(null);
    } else {
      const newCard: Flashcard = {
        id: `card_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        german: german.trim(),
        translation: translation.trim(),
        article,
        preposition: preposition.trim(),
        exampleGerman: exampleGerman.trim(),
        exampleTranslation: exampleTranslation.trim(),
      };
      setCards((prev) => [...prev, newCard]);
    }

    // Reset card inputs
    setGerman('');
    setTranslation('');
    setArticle('');
    setPreposition('');
    setExampleGerman('');
    setExampleTranslation('');
  };

  // Edit card inline
  const handleStartEditCard = (card: Flashcard) => {
    setEditingCardId(card.id);
    setGerman(card.german);
    setTranslation(card.translation);
    setArticle(card.article || '');
    setPreposition(card.preposition || '');
    setExampleGerman(card.exampleGerman || '');
    setExampleTranslation(card.exampleTranslation || '');
  };

  // Remove card
  const handleRemoveCard = (cardId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  // Process Bulk Text Import (format: German - Translation - Preposition)
  const handleProcessBulkImport = () => {
    if (!bulkText.trim()) return;

    const lines = bulkText.split('\n');
    const newCards: Flashcard[] = [];

    lines.forEach((line) => {
      const parts = line.split('-').map((p) => p.trim());
      if (parts.length >= 2 && parts[0] && parts[1]) {
        let art: 'der' | 'die' | 'das' | '' = '';
        let word = parts[0];

        if (word.startsWith('der ')) {
          art = 'der';
          word = word.replace('der ', '');
        } else if (word.startsWith('die ')) {
          art = 'die';
          word = word.replace('die ', '');
        } else if (word.startsWith('das ')) {
          art = 'das';
          word = word.replace('das ', '');
        }

        newCards.push({
          id: `card_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          german: word,
          translation: parts[1],
          article: art,
          preposition: parts[2] || '',
          exampleGerman: parts[3] || '',
        });
      }
    });

    if (newCards.length > 0) {
      setCards((prev) => [...prev, ...newCards]);
      setBulkText('');
      setActiveTab('cards');
    }
  };

  // Save entire deck
  const handleSaveDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const deckData: Deck = {
      id: deckToEdit ? deckToEdit.id : `deck_${Date.now()}`,
      title: title.trim(),
      description: description.trim() || getTranslation(uiLanguage, 'myDecks'),
      icon: icon || '📙',
      category: category || 'Мої списки',
      isPublic: false,
      isPinned: deckToEdit ? deckToEdit.isPinned : false,
      createdAt: deckToEdit ? deckToEdit.createdAt : Date.now(),
      updatedAt: Date.now(),
      cards,
    };

    onSave(deckData);
    onClose();
  };

  const iconsList = ['📙', '📗', '📕', '⚡', '🎓', '💬', '✈️', '💼', '🏆', '⭐', '🧩'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className={`w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl border overflow-hidden transition-all ${
          isDarkMode
            ? 'bg-[#1e1f20] text-gray-100 border-gray-800'
            : 'bg-white text-gray-900 border-gray-200'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/60 dark:border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {deckToEdit ? getTranslation(uiLanguage, 'editDeckTitle') : getTranslation(uiLanguage, 'createNewDeckTitle')}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {getTranslation(uiLanguage, 'editDeckSubtitle')}
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Deck Main Meta Info */}
          <div className="space-y-4">
            <div className="flex gap-3">
              {/* Emoji Icon Picker */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                  {getTranslation(uiLanguage, 'iconLabel')}
                </label>
                <div className="flex items-center gap-1">
                  <select
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="p-2.5 rounded-2xl border bg-transparent text-xl text-center outline-none border-gray-200 dark:border-gray-700"
                  >
                    {iconsList.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Deck Title */}
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">
                  {getTranslation(uiLanguage, 'deckTitleLabel')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={getTranslation(uiLanguage, 'deckTitlePlaceholder')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border outline-none border-gray-200 dark:border-gray-700 focus:border-blue-500 text-sm font-medium dark:bg-gray-800"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block">
                {getTranslation(uiLanguage, 'deckDescLabel')}
              </label>
              <input
                type="text"
                placeholder={getTranslation(uiLanguage, 'deckDescPlaceholder')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-2xl border outline-none border-gray-200 dark:border-gray-700 focus:border-blue-500 text-xs dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Tab Switcher: Cards list vs Mass Import */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('cards')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    activeTab === 'cards'
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-gray-500'
                  }`}
                >
                  {getTranslation(uiLanguage, 'cardsInDeck')} ({cards.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('bulk')}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    activeTab === 'bulk'
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-gray-500'
                  }`}
                >
                  {getTranslation(uiLanguage, 'bulkImport')}
                </button>
              </div>
            </div>

            {/* TAB 1: Single Card Creator & List */}
            {activeTab === 'cards' && (
              <div className="space-y-4">
                {/* Form to add single card */}
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 space-y-3">
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 block">
                    {editingCardId ? `✏️ ${getTranslation(uiLanguage, 'editCard')}` : `➕ ${getTranslation(uiLanguage, 'addNewWord')}`}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* Article picker */}
                    <div>
                      <select
                        value={article}
                        onChange={(e) => setArticle(e.target.value as any)}
                        className="w-full p-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                      >
                        <option value="">{getTranslation(uiLanguage, 'noArticle')}</option>
                        <option value="der">der (m)</option>
                        <option value="die">die (f)</option>
                        <option value="das">das (n)</option>
                      </select>
                    </div>

                    {/* German Word */}
                    <div>
                      <input
                        type="text"
                        placeholder={`${getTranslation(uiLanguage, 'germanWordPlaceholder')} *`}
                        value={german}
                        onChange={(e) => setGerman(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none font-semibold text-blue-600 dark:text-blue-400"
                      />
                    </div>

                    {/* Translation */}
                    <div>
                      <input
                        type="text"
                        placeholder={`${getTranslation(uiLanguage, 'translationPlaceholder')} *`}
                        value={translation}
                        onChange={(e) => setTranslation(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* Preposition */}
                    <div>
                      <input
                        type="text"
                        placeholder={getTranslation(uiLanguage, 'prepositionPlaceholder')}
                        value={preposition}
                        onChange={(e) => setPreposition(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                      />
                    </div>

                    {/* Example German */}
                    <div>
                      <input
                        type="text"
                        placeholder={getTranslation(uiLanguage, 'exampleGermanPlaceholder')}
                        value={exampleGerman}
                        onChange={(e) => setExampleGerman(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                      />
                    </div>

                    {/* Example Translation */}
                    <div>
                      <input
                        type="text"
                        placeholder={getTranslation(uiLanguage, 'exampleTranslationPlaceholder')}
                        value={exampleTranslation}
                        onChange={(e) => setExampleTranslation(e.target.value)}
                        className="w-full p-2 text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    {editingCardId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCardId(null);
                          setGerman('');
                          setTranslation('');
                        }}
                        className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800"
                      >
                        {getTranslation(uiLanguage, 'cancel')}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleAddOrUpdateCard}
                      disabled={!german.trim() || !translation.trim()}
                      className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs disabled:opacity-50"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{editingCardId ? getTranslation(uiLanguage, 'updateCard') : getTranslation(uiLanguage, 'addToList')}</span>
                    </button>
                  </div>
                </div>

                {/* Cards preview list */}
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1 custom-scrollbar">
                  {cards.length === 0 ? (
                    <p className="text-center text-xs text-gray-400 py-4">
                      {getTranslation(uiLanguage, 'emptyDeckPrompt')}
                    </p>
                  ) : (
                    cards.map((c, idx) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/40 text-xs hover:border-blue-200 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 font-mono w-5">{idx + 1}.</span>
                          <div>
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                              {c.article && `${c.article} `}
                              {c.german}
                            </span>
                            {c.preposition && (
                              <span className="ml-1.5 text-[10px] font-semibold text-purple-600 bg-purple-50 dark:bg-purple-950 px-1.5 py-0.5 rounded-md">
                                {c.preposition}
                              </span>
                            )}
                            <span className="text-gray-400 mx-2">—</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">
                              {c.translation}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleStartEditCard(c)}
                            className="p-1 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveCard(c.id)}
                            className="p-1 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: Mass Import Text Box */}
            {activeTab === 'bulk' && (
              <div className="space-y-3">
                <p className="text-xs text-gray-500">
                  {getTranslation(uiLanguage, 'bulkImportInstructions')}: <br />
                  <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[11px] font-mono">
                    word - translation - preposition - example
                  </code>
                </p>
                <textarea
                  rows={6}
                  placeholder={`warten - чекати - auf (+Akk) - Ich warte auf den Bus\nder Tisch - стіл - - Стіл у кухні\nträumen - мріяти - von (+Dat)`}
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  className="w-full p-3 rounded-2xl border outline-none font-mono text-xs border-gray-200 dark:border-gray-700 dark:bg-gray-800"
                />
                <button
                  type="button"
                  onClick={handleProcessBulkImport}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{getTranslation(uiLanguage, 'processBulkWords')}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200/60 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
          <span className="text-xs text-gray-400">
            {getTranslation(uiLanguage, 'totalWordsInList')}: <strong>{cards.length}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              {getTranslation(uiLanguage, 'cancel')}
            </button>
            <button
              type="button"
              onClick={handleSaveDeck}
              disabled={!title.trim()}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs shadow-md disabled:opacity-50 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{getTranslation(uiLanguage, 'saveDeck')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
