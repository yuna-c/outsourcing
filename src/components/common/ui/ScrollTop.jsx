import { useEffect } from 'react';
import { throttle } from 'lodash';
import useScrollStore from '../../../core/stores/useScrollStore';

const ScrollTop = () => {
  const { isVisible, setIsVisible } = useScrollStore();

  const toggleVisibility = throttle(() => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 w-10 h-10 rounded-full bg-white border border-white text-custom-deepblue shadow-lg transition-opacity duration-300 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      aria-label="위로가기"
    >
      ↑
    </button>
  );
};

export default ScrollTop;
