import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronDown } from "lucide-react";
import { Language } from "../utils/translations";

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  isCollapsed?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange,
  isCollapsed = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Список доступних мов із прапорцями
  const languages: { code: Language; label: string; flagUrl: string }[] = [
    { code: "uk", label: "Українська", flagUrl: "https://flagcdn.com/ua.svg" },
    { code: "en", label: "English", flagUrl: "https://flagcdn.com/gb.svg" },
    { code: "de", label: "Deutsch", flagUrl: "https://flagcdn.com/de.svg" },
  ];

  const currentLangObj =
    languages.find((l) => l.code === currentLanguage) || languages[0];

  // Закриття дропдауну при кліку поза його межами
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Кнопка-тригер (те, що бачить користувач завжди) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-all shadow-sm ${
          isCollapsed ? "p-2 w-11 h-11" : "gap-2 px-3 py-2 sm:px-2 sm:py-1"
        }`}
      >
        {!isCollapsed && (
          <Globe className="w-4 h-4 text-gray-400 dark:text-gray-500 hidden sm:block" />
        )}

        <img
          src={currentLangObj.flagUrl}
          alt={currentLangObj.code}
          className="w-5 h-auto rounded-sm shadow-[0_0_2px_rgba(0,0,0,0.2)]"
        />

        {!isCollapsed && (
          <>
            <span className="uppercase tracking-wider text-sm font-semibold text-gray-700 dark:text-gray-200">
              {currentLangObj.code}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      {/* Анімований випадаючий список */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right- bottom-full mb-2 w-44 rounded-2xl bg-white dark:bg-[#1e1f20] shadow-xl border border-gray-100 dark:border-gray-700/80 overflow-hidden z-50 origin-top-right"
          >
            <div className="py-1">
              {languages.map((lang) => {
                const isActive = currentLanguage === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <img
                      src={lang.flagUrl}
                      alt={lang.code}
                      className="w-5 h-4 object-cover rounded-sm"
                    />
                    <span>{lang.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
