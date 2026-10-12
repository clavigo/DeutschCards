import { Pin } from "lucide-react";
import { Deck } from "../types";
import { Language, getTranslation } from "../utils/translations";

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

export const DeckNavItem: React.FC<DeckNavItemProps> = ({
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
      className={`group relative flex items-center rounded-2xl cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
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
      <div
        className={`flex items-center ${
          isCollapsed ? "w-full justify-center" : "gap-2.5 min-w-0"
        }`}
      >
        <span
          className={`flex items-center justify-center leading-none transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
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
