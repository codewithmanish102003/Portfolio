import { ArrowUp } from 'lucide-react';

type ScrollToTopButtonProps = {
  visible: boolean;
  onClick: () => void;
};

export function ScrollToTopButton({ visible, onClick }: ScrollToTopButtonProps) {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full btn-primary flex items-center justify-center shadow-lg"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
