import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Basic window scroll
    window.scrollTo(0, 0);
    
    // 2. Element level scroll (Important if you use height: 100vh)
    const elementsToScroll = [
      document.documentElement,
      document.body,
      document.querySelector('#root'), // React ka main root
      document.querySelector('main')   // Aapka main tag
    ];

    elementsToScroll.forEach(el => {
      if (el) el.scrollTop = 0;
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;