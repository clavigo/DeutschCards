import { useEffect } from "react";

interface ShortcutHandlers {
  onNext: () => void;
  onPrev: () => void;
  onMarkKnown: () => void;
  onMarkLearning: () => void;
  isDisabled: boolean;
}

export const useKeyboardShortcuts = ({
  onNext,
  onPrev,
  onMarkKnown,
  onMarkLearning,
  isDisabled,
}: ShortcutHandlers) => {
  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts inside text inputs or modals
      if (
        isDisabled ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          (e.target as HTMLElement)?.tagName,
        )
      ) {
        return;
      }

      if (e.code === "ArrowRight") {
        onNext();
      } else if (e.code === "ArrowLeft") {
        onPrev();
      } else if (e.code === "ArrowUp") {
        onMarkKnown();
      } else if (e.code === "ArrowDown") {
        onMarkLearning;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onMarkKnown, onMarkLearning, isDisabled]);
};
