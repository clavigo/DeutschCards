import React, { useState } from "react";
import {
  Sparkles,
  Plus,
  Pin,
  Globe,
  FolderPlus,
  Search,
  BarChart2,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence, Transition } from "motion/react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Deck } from "../types";
import { calculateDeckStats } from "../utils/storage";
import { Language, getTranslation } from "../utils/translations";

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
  onExportData,
  onImportData,
  onToggleSidebar,
  onOpenStats,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDecks = decks.filter(
    (d) =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const pinnedDecks = filteredDecks.filter((d) => pinnedIds.includes(d.id));
  const publicDecks = filteredDecks.filter(
    (d) => d.isPublic && !pinnedIds.includes(d.id),
  );

  // Повертаємо власні списки
  const userDecks = filteredDecks.filter(
    (d) => !d.isPublic && !pinnedIds.includes(d.id),
  );

  const totalCards = decks.reduce((acc, d) => acc + d.cards.length, 0);
  let totalKnown = 0;
  decks.forEach((deck) => {
    const stats = calculateDeckStats(deck, progressMap);
    totalKnown += stats.known;
  });
  const totalPercentage =
    totalCards > 0 ? Math.round((totalKnown / totalCards) * 100) : 0;

  // Компонент-розділювач (тонка лінія)
  const Divider = () => (
    <div className="h-px bg-gray-200/70 dark:bg-gray-800/70 mx-3 my-3" />
  );

  const animConfig: Transition = { duration: 0.3, ease: "easeInOut" };

  return (
    <>
      {/* Mobile Backdrop
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs transition-opacity"
          onClick={onToggleSidebar}
        />
      )} */}

      {/* Mobile & Tablet Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={animConfig}
            // Змінюємо на lg:hidden, щоб затемнення було і на мобілках, і на планшетах
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs"
            onClick={onToggleSidebar}
          />
        )}
      </AnimatePresence>

      <aside
        id="sidebar-container"
        // fixed для мобілок/планшетів, lg:static для ПК
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 flex flex-col transition-all duration-300 ease-in-out border-r ${
          isDarkMode
            ? "bg-[#131314] text-gray-200 border-gray-800"
            : "bg-[#f8f9fa] text-gray-800 border-gray-200"
        } ${
          isOpen
            ? "w-72 translate-x-0"
            : // На мобілках ховаємо повністю, на md (планшети) залишаємо вузьку панель (w-16)
              "-translate-x-full md:translate-x-0 md:w-16"
        }`}
      >
        {/* Header / Logo & Toggle */}
        <div
          className={`flex items-center ${isOpen ? "justify-between px-4" : "justify-center"} py-4 border-b border-gray-200/50 dark:border-gray-800/80 min-h-[72px]`}
        >
          {isOpen ? (
            <>
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-amber-400 text-white shadow-md shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    DeutschCards
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                    {getTranslation(uiLanguage, "appSubtitle")}
                  </span>
                </div>
              </div>

              <button
                onClick={onToggleSidebar}
                // На планшетах (md) ми теж хочемо бачити кнопку згортання!
                className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors hidden md:flex"
                title="Згорнути панель"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={onToggleSidebar}
              // Кнопка розгортання на планшетах (md)
              className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-all hidden md:flex"
              title="Розгорнути панель"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Create Deck Action Button & Search (Only when open) */}
        {isOpen && (
          <div className="p-3 space-y-3">
            <button
              onClick={onCreateDeck}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="truncate">
                {getTranslation(uiLanguage, "newDeck")}
              </span>
            </button>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={getTranslation(
                  uiLanguage,
                  "searchDecksPlaceholder",
                )}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border outline-none transition-all ${
                  isDarkMode
                    ? "bg-[#1e1f20] border-gray-800 text-gray-200 focus:border-blue-500"
                    : "bg-white border-gray-200 text-gray-800 focus:border-blue-500"
                }`}
              />
            </div>
          </div>
        )}

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 custom-scrollbar mt-2">
          {/* Pinned Decks */}
          {pinnedDecks.length > 0 && (
            <div>
              {isOpen && (
                <div className="py-1 px-3 flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <Pin className="w-3 h-3 text-amber-500" />
                  <span>{getTranslation(uiLanguage, "pinnedDecks")}</span>
                </div>
              )}
              <div className="space-y-1 mt-1">
                {pinnedDecks.map((deck) => (
                  <DeckNavItem
                    key={deck.id}
                    deck={deck}
                    isActive={deck.id === activeDeckId}
                    isPinned={true}
                    isCollapsed={!isOpen}
                    uiLanguage={uiLanguage}
                    isDarkMode={isDarkMode}
                    onSelect={() => onSelectDeck(deck.id)}
                    onTogglePin={() => onTogglePin(deck.id)}
                  />
                ))}
              </div>
              <Divider />
            </div>
          )}

          {/* Public Decks */}
          <div>
            {isOpen && (
              <div className="py-1 px-3 flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <Globe className="w-3 h-3 text-blue-500" />
                <span>{getTranslation(uiLanguage, "publicDecks")}</span>
              </div>
            )}
            <div className="space-y-1 mt-1">
              {publicDecks.map((deck) => (
                <DeckNavItem
                  key={deck.id}
                  deck={deck}
                  isActive={deck.id === activeDeckId}
                  isPinned={false}
                  isCollapsed={!isOpen}
                  uiLanguage={uiLanguage}
                  isDarkMode={isDarkMode}
                  onSelect={() => onSelectDeck(deck.id)}
                  onTogglePin={() => onTogglePin(deck.id)}
                />
              ))}
            </div>
          </div>

          {/* User Decks (Only when open) */}
          {isOpen && (
            <>
              <Divider />
              <div>
                <div className="py-1 px-3 flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <FolderPlus className="w-3 h-3 text-purple-500" />
                    <span>{getTranslation(uiLanguage, "myDecks")}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-normal">
                    ({userDecks.length})
                  </span>
                </div>

                <div className="space-y-1 mt-1">
                  {userDecks.length === 0 ? (
                    <div className="px-3 py-3 text-center text-xs text-gray-400 rounded-xl border border-dashed border-gray-300 dark:border-gray-800 my-1">
                      {getTranslation(uiLanguage, "noDecksFound")}
                    </div>
                  ) : (
                    userDecks.map((deck) => (
                      <DeckNavItem
                        key={deck.id}
                        deck={deck}
                        isActive={deck.id === activeDeckId}
                        isPinned={false}
                        isCollapsed={!isOpen}
                        uiLanguage={uiLanguage}
                        isDarkMode={isDarkMode}
                        onSelect={() => onSelectDeck(deck.id)}
                        onTogglePin={() => onTogglePin(deck.id)}
                      />
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Quick Stats & Controls */}
        <div className="p-3 border-t border-gray-200/50 dark:border-gray-800/80 flex flex-col gap-2">
          {isOpen && (
            <div
              onClick={onOpenStats}
              className={`p-2.5 rounded-2xl cursor-pointer transition-all border ${isDarkMode ? "bg-[#1e1f20] hover:bg-[#282a2c] border-gray-800" : "bg-white hover:bg-gray-100 border-gray-200"}`}
            >
              <div className="flex items-center justify-between mb-1 text-xs">
                <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
                  <BarChart2 className="w-3.5 h-3.5 text-blue-500" />
                  {getTranslation(uiLanguage, "overallProgress")}
                </span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {totalPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalPercentage}%` }}
                />
              </div>
            </div>
          )}

          <div
            className={`flex items-center ${isOpen ? "justify-between px-2.5 py-1.5 rounded-2xl bg-gray-100/80 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 text-xs" : "justify-center"}`}
          >
            {isOpen && (
              <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 font-medium">
                <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="text-[11px] truncate">
                  {getTranslation(uiLanguage, "uiLanguage")}
                </span>
              </div>
            )}
            <LanguageSwitcher
              currentLanguage={uiLanguage}
              onLanguageChange={onLanguageChange}
              isCollapsed={!isOpen}
            />
          </div>

          <div
            className={`flex items-center ${isOpen ? "justify-end gap-1 pt-1" : "flex-col gap-2"}`}
          >
            <button
              onClick={onExportData}
              className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              title={getTranslation(uiLanguage, "exportData")}
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onImportData}
              className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              title={getTranslation(uiLanguage, "importData")}
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

// ==========================================
// DeckNavItem Component
// ==========================================

interface DeckNavItemProps {
  deck: Deck;
  isActive: boolean;
  isPinned: boolean;
  isCollapsed: boolean;
  isDarkMode: boolean;
  uiLanguage: Language;
  onSelect: () => void;
  onTogglePin: () => void;
}

const DeckNavItem: React.FC<DeckNavItemProps> = ({
  deck,
  isActive,
  isPinned,
  isCollapsed,
  isDarkMode,
  uiLanguage,
  onSelect,
  onTogglePin,
}) => {
  return (
    <div
      onClick={onSelect}
      title={isCollapsed ? deck.title : undefined}
      className={`group relative flex items-center rounded-2xl cursor-pointer transition-all ${
        isCollapsed
          ? "justify-center p-2.5 mx-auto h-11"
          : "justify-between px-3 py-2.5 w-full"
      } ${
        isActive
          ? isDarkMode
            ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 font-medium"
            : "bg-blue-50 text-blue-700 border border-blue-200 font-medium"
          : isDarkMode
            ? "hover:bg-[#1e1f20] text-gray-300 border border-transparent"
            : "hover:bg-gray-100 text-gray-700 border border-transparent"
      }`}
    >
      {/* Додано w-full та justify-center для згорнутого стану */}
      <div
        className={`flex items-center ${isCollapsed ? "w-full justify-center" : "gap-2.5 min-w-0"}`}
      >
        <span
          className={`flex items-center justify-center leading-none ${
            isCollapsed ? "text-xl" : "text-base"
          } shrink-0 drop-shadow-sm`}
        >
          {deck.icon || "📘"}
        </span>

        {!isCollapsed && (
          <div className="flex flex-col truncate">
            <span className="text-xs truncate">{deck.title}</span>
            <span className="text-[10px] text-gray-400 font-normal">
              {deck.cards.length}{" "}
              {getTranslation(uiLanguage, "wordsCountSuffix")}
            </span>
          </div>
        )}
      </div>

      {!isCollapsed && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin();
          }}
          className={`p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ${
            isPinned
              ? "opacity-100 text-amber-500"
              : "text-gray-400 hover:text-gray-600"
          }`}
          title={
            isPinned
              ? getTranslation(uiLanguage, "pinnDeck")
              : getTranslation(uiLanguage, "unpinnDeck")
          }
        >
          <Pin className="w-3.5 h-3.5 fill-current" />
        </button>
      )}
    </div>
  );
};
