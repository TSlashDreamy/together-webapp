import { useEffect, useRef, MutableRefObject } from "react";

export const useIntersectionObserver = (callback: () => void, options?: IntersectionObserverInit): MutableRefObject<HTMLDivElement | null> => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [callback, options]);

  return elementRef;
};
