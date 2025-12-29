import { useEffect, useRef } from 'react';

export const useTVNavigation = (sectionId: string, priority: number = 0) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement;
      
      if (!activeElement || activeElement === document.body) {
        const firstFocusable = document.querySelector('.focusable-item') as HTMLElement;
        if (firstFocusable) {
          firstFocusable.focus();
          e.preventDefault();
          return;
        }
      }

      if (e.key === 'ArrowDown') {
        const currentSection = activeElement.closest('[data-tv-section]');
        if (currentSection) {
          const allSections = Array.from(document.querySelectorAll('[data-tv-section]'));
          const currentIndex = allSections.indexOf(currentSection);
          
          if (currentIndex < allSections.length - 1) {
            const nextSection = allSections[currentIndex + 1];
            const nextFocusable = nextSection.querySelector('.focusable-item') as HTMLElement;
            
            if (nextFocusable) {
              e.preventDefault();
              nextFocusable.focus();
              nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }
      }

      if (e.key === 'ArrowUp') {
        const currentSection = activeElement.closest('[data-tv-section]');
        if (currentSection) {
          const allSections = Array.from(document.querySelectorAll('[data-tv-section]'));
          const currentIndex = allSections.indexOf(currentSection);
          
          if (currentIndex > 0) {
            const prevSection = allSections[currentIndex - 1];
            const prevFocusable = prevSection.querySelector('.focusable-item') as HTMLElement;
            
            if (prevFocusable) {
              e.preventDefault();
              prevFocusable.focus();
              prevSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return containerRef;
};
