import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Pin,
  Globe,
  FolderPlus,
  BookOpen,
  Search,
  Moon,
  Sun,
  BarChart2,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  Menu,
  CheckCircle2
} from 'lucide-react';
import { Deck, DeckStats } from '../types';
import { calculateDeckStats } from '../utils/storage';
import { Language, LANGUAGES, getTranslation } from '../utils/translations';

interface SidebarProps {
  decks: Deck[];
  activeDeckId: string | null;
  pinnedIds: string[];
  progressMap: Record<string, any>;
  isDarkMode: boolean;
  isOpen: boolean;
  uiLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectDeck: (deckId: string) => void;
  onTogglePin: (deckId: string) => void;
  onCreateDeck: () => void;
  onToggleTheme: () => void;
  onOpenStats: () => void;
  onExportData: () => void;
  onImportData: () => void;
  onToggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  decks,
  activeDeckId,
  pinnedIds,
  progressMap,
  isDarkMode,
  isOpen,
  uiLanguage,
  onLanguageChange,
  onSelectDeck,
  onTogglePin,
  onCreateDeck,
  onToggleTheme,
  onOpenStats,
  onExportData,
  onImportData,
  onToggleSidebar,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDecks = decks.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedDecks = filteredDecks.filter((d) => pinnedIds.includes(d.id));
  const publicDecks = filteredDecks.filter((d) => d.isPublic && !pinnedIds.includes(d.id));
  const userDecks = filteredDecks.filter((d) => !d.isPublic && !pinnedIds.includes(d.id));

  // Overall total statistics
  const totalCards = decks.reduce((acc, d) => acc + d.cards.length, 0);
  let totalKnown = 0;
  decks.forEach((deck) => {
    const stats = calculateDeckStats(deck, progressMap);
    totalKnown += stats.known;
  });
  const totalPercentage = totalCards > 0 ? Math.round((totalKnown / totalCards) * 100) : 0;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs transition-opacity"
          onClick={onToggleSidebar}
        />
      )}

      <aside
        id="sidebar-container"
        className={`fixed md:static top-0 left-0 bottom-0 z-50 flex flex-col w-72 transition-all duration-300 ease-in-out border-r ${
          isDarkMode
            ? 'bg-[#131314] text-gray-200 border-gray-800'
            : 'bg-[#f8f9fa] text-gray-800 border-gray-200'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20 lg:w-72'}`}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-amber-400 text-white shadow-md shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col truncate">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                {getTranslation(uiLanguage, 'appName')}
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {getTranslation(uiLanguage, 'appSubtitle')}
              </span>
            </div>
          </div>

          <button
            id="toggle-sidebar-btn"
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors hidden md:flex"
            title={isOpen ? 'Згорнути панель' : 'Розгорнути панель'}
          >
            {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Create Deck Action Button */}
        <div className="p-3">
          <button
            id="create-deck-sidebar-btn"
            onClick={onCreateDeck}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all transform active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span className="truncate">{getTranslation(uiLanguage, 'newDeck')}</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="px-3 mb-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="search-decks-input"
              type="text"
              placeholder={getTranslation(uiLanguage, 'searchDecksPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border outline-none transition-all ${
                isDarkMode
                  ? 'bg-[#1e1f20] border-gray-800 text-gray-200 focus:border-blue-500'
                  : 'bg-white border-gray-200 text-gray-800 focus:border-blue-500'
              }`}
            />
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-2 space-y-4 custom-scrollbar">
          {/* Pinned Decks Section */}
          {pinnedDecks.length > 0 && (
            <div>
              <div className="px-3 py-1 flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <Pin className="w-3 h-3 text-amber-500" />
                <span>{getTranslation(uiLanguage, 'pinnedDecks')}</span>
              </div>
              <div className="mt-1 space-y-0.5">
                {pinnedDecks.map((deck) => (
                  <DeckNavItem
                    key={deck.id}
                    deck={deck}
                    isActive={deck.id === activeDeckId}
                    isPinned={true}
                    progressMap={progressMap}
                    isDarkMode={isDarkMode}
                    onSelect={() => onSelectDeck(deck.id)}
                    onTogglePin={() => onTogglePin(deck.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Public / Common Decks Section */}
          <div>
            <div className="px-3 py-1 flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              <Globe className="w-3 h-3 text-blue-500" />
              <span>{getTranslation(uiLanguage, 'publicDecks')}</span>
            </div>
            <div className="mt-1 space-y-0.5">
              {publicDecks.map((deck) => (
                <DeckNavItem
                  key={deck.id}
                  deck={deck}
                  isActive={deck.id === activeDeckId}
                  isPinned={false}
                  progressMap={progressMap}
                  isDarkMode={isDarkMode}
                  onSelect={() => onSelectDeck(deck.id)}
                  onTogglePin={() => onTogglePin(deck.id)}
                />
              ))}
            </div>
          </div>

          {/* User Custom Decks Section */}
          <div>
            <div className="px-3 py-1 flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <FolderPlus className="w-3 h-3 text-purple-500" />
                <span>{getTranslation(uiLanguage, 'myDecks')}</span>
              </div>
              <span className="text-[10px] text-gray-400 font-normal">({userDecks.length})</span>
            </div>

            <div className="mt-1 space-y-0.5">
              {userDecks.length === 0 ? (
                <div className="px-3 py-3 text-center text-xs text-gray-400 rounded-xl border border-dashed border-gray-300 dark:border-gray-800 my-1">
                  {getTranslation(uiLanguage, 'noDecksFound')}
                </div>
              ) : (
                userDecks.map((deck) => (
                  <DeckNavItem
                    key={deck.id}
                    deck={deck}
                    isActive={deck.id === activeDeckId}
                    isPinned={false}
                    progressMap={progressMap}
                    isDarkMode={isDarkMode}
                    onSelect={() => onSelectDeck(deck.id)}
                    onTogglePin={() => onTogglePin(deck.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer Quick Stats & Controls */}
        <div className="p-3 border-t border-gray-200/50 dark:border-gray-800/80 space-y-2">
          {/* Progress Indicator */}
          <div
            onClick={onOpenStats}
            className={`p-2.5 rounded-2xl cursor-pointer transition-all border ${
              isDarkMode
                ? 'bg-[#1e1f20] hover:bg-[#282a2c] border-gray-800'
                : 'bg-white hover:bg-gray-100 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
                <BarChart2 className="w-3.5 h-3.5 text-blue-500" />
                {getTranslation(uiLanguage, 'overallProgress')}
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">{totalPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${totalPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>{totalKnown} {getTranslation(uiLanguage, 'learned')}</span>
              <span>{getTranslation(uiLanguage, 'learnedOfWords', { total: totalCards })}</span>
            </div>
          </div>

          {/* Language Switcher Bar */}
          <div className="flex items-center justify-between px-2.5 py-1.5 rounded-2xl bg-gray-100/80 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 text-xs">
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 font-medium">
              <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="text-[11px] truncate">{getTranslation(uiLanguage, 'uiLanguage')}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code)}
                  className={`px-2 py-0.5 text-[11px] font-bold rounded-lg transition-all ${
                    uiLanguage === lang.code
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-700/60'
                  }`}
                  title={lang.label}
                >
                  <span>{lang.flag}</span>
                  <span className="ml-1 uppercase">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <div className="flex items-center justify-between pt-1">
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              className={`p-2 rounded-xl transition-colors ${
                isDarkMode ? 'hover:bg-gray-800 text-amber-400' : 'hover:bg-gray-200 text-indigo-600'
              }`}
              title={isDarkMode ? getTranslation(uiLanguage, 'themeLight') : getTranslation(uiLanguage, 'themeDark')}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-1">
              <button
                id="export-data-btn"
                onClick={onExportData}
                className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                title={getTranslation(uiLanguage, 'exportData')}
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                id="import-data-btn"
                onClick={onImportData}
                className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                title={getTranslation(uiLanguage, 'importData')}
              >
                <Upload className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Deck Nav Item Helper Component
interface DeckNavItemProps {
  deck: Deck;
  isActive: boolean;
  isPinned: boolean;
  progressMap: Record<string, any>;
  isDarkMode: boolean;
  onSelect: () => void;
  onTogglePin: () => void;
}

const DeckNavItem: React.FC<DeckNavItemProps> = ({
  deck,
  isActive,
  isPinned,
  progressMap,
  isDarkMode,
  onSelect,
  onTogglePin,
}) => {
  const stats = calculateDeckStats(deck, progressMap);

  return (
    <div
      onClick={onSelect}
      className={`group relative flex items-center justify-between px-3 py-2.5 rounded-2xl cursor-pointer transition-all ${
        isActive
          ? isDarkMode
            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-medium'
            : 'bg-blue-50 text-blue-700 border border-blue-200 font-medium'
          : isDarkMode
          ? 'hover:bg-[#1e1f20] text-gray-300'
          : 'hover:bg-gray-100 text-gray-700'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-base shrink-0">{deck.icon || '📘'}</span>
        <div className="flex flex-col truncate">
          <span className="text-xs truncate">{deck.title}</span>
          <span className="text-[10px] text-gray-400 font-normal">
            {deck.cards.length} слів • {stats.percentage}%
          </span>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onTogglePin();
        }}
        className={`p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
          isPinned ? 'opacity-100 text-amber-500' : 'text-gray-400 hover:text-gray-600'
        }`}
        title={isPinned ? 'Відкріпити список' : 'Закріпити список'}
      >
        <Pin className="w-3.5 h-3.5 fill-current" />
      </button>
    </div>
  );
};
