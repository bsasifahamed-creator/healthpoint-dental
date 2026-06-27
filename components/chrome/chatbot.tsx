'use client';

import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Chatbot() {
  const href =
    'https://wa.me/971585886915?text=Hi%20Health%20Point%2C%20I%20found%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20dental%20services!';
  
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkMenuOpen = () => {
      const bodyStyles = document.body.style;
      const isMenuOpen = bodyStyles.overflow === 'hidden' || bodyStyles.position === 'fixed';
      setIsVisible(!isMenuOpen);
    };
    
    checkMenuOpen();
    
    const observer = new MutationObserver(checkMenuOpen);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-20 right-8 z-[9999] flex h-14 items-center gap-2.5 rounded-full bg-[#58e880] px-5 text-[15px] font-bold text-white shadow-[0_6px_24px_rgba(37,211,102,0.5)] transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:px-6 md:bottom-16 md:right-28 md:h-16 md:px-7 md:text-base"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
          aria-label="Chat on WhatsApp"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-full"
            style={{ boxShadow: '0 0 0 0 rgba(37,211,102,0.3)' }}
          />
          <MessageCircle className="size-5 text-white" strokeWidth={2.4} aria-hidden />
          <span className="hidden tracking-wide sm:inline">Chat with us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
