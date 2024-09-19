import { useEffect, useCallback } from 'react';
import useScrollStore from '../../../core/stores/useScrollStore';

const ScrollTop = () => {
  const { isVisible, setIsVisible } = useScrollStore();

  const toggleVisibility = useCallback(() => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [setIsVisible]);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 w-10 h-10 rounded-full bg-black text-white shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollTop;
