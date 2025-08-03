import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const isScrollingRef = useRef(false);

  useEffect(() => {
    // Define information page routes that should scroll to top
    const informationPageRoutes = [
      '/about',
      '/privacy',
      '/terms',
      '/contact',
      '/safety',
      '/intellectual-property',
      '/faq'
    ];

    // Check if current route is an information page
    const isInformationPage = informationPageRoutes.includes(pathname);

    if (isInformationPage && !isScrollingRef.current) {
      isScrollingRef.current = true;

      // Simple smooth scroll implementation
      const smoothScrollToTop = () => {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        
        if (currentScroll > 0) {
          // Use requestAnimationFrame for smooth animation
          const scrollStep = -currentScroll / 25; // Adjust for speed
          
          const scrollAnimation = () => {
            const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentPosition > 0) {
              window.scrollTo(0, currentPosition + scrollStep);
              requestAnimationFrame(scrollAnimation);
            } else {
              // Animation complete, reset flag
              isScrollingRef.current = false;
            }
          };
          
          requestAnimationFrame(scrollAnimation);
        } else {
          // Already at top, reset flag
          isScrollingRef.current = false;
        }
      };

      // Execute smooth scroll with a small delay to ensure route change has completed
      setTimeout(smoothScrollToTop, 50);
    }

  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
