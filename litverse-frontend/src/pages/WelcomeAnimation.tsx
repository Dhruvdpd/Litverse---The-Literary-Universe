import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Create books with specified entry directions
const leftBooks = Array.from({ length: 5 }).map(() => ({ entryX: -300 }));
const rightBooks = Array.from({ length: 5 }).map(() => ({ entryX: 300 }));
const allBooks = [...leftBooks, ...rightBooks];

const WelcomeAnimation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const redirectTo = location.state?.from || '/home';
      navigate(redirectTo); // redirect after animation
    }, 7000); // Extended to 7 seconds to allow circle to form and hold

    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#F3E5AB] overflow-hidden relative">
      {/* Central text with serif font */}
      <motion.h1 
        className="text-4xl md:text-6xl font-serif text-[#5E412F] mb-12 z-10 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        Welcome to <span className="text-[#8B5E3C] italic">LitVerse</span> 📚
      </motion.h1>

      {/* Books circling animation */}
      {allBooks.map((book, i) => {
        const isLeftEntry = i < leftBooks.length;
        const delay = i * 0.15;
        const angle = (i / allBooks.length) * Math.PI * 2;
        const radius = 200;
        
        return (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              x: isLeftEntry ? -300 : 300,
              y: 0,
              scale: 0.2,
              rotate: isLeftEntry ? -45 : 45 
            }}
            animate={{
              opacity: 1,
              scale: 1.5,
              rotate: 0,
              x: [
                isLeftEntry ? -300 : 300, // Start position
                0, // Move to center
                Math.cos(angle) * radius, // Move to circle position
                Math.cos(angle) * radius  // Hold position
              ],
              y: [
                0, // Start position
                0, // At center
                Math.sin(angle) * radius, // Move to circle position
                Math.sin(angle) * radius  // Hold position
              ]
            }}
            transition={{
              duration: 4,
              times: [0, 0.25, 0.5, 1], // Timing for each position
              delay: delay,
              ease: "easeInOut"
            }}
            className="absolute text-6xl"
            style={{
              filter: "drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.3))"
            }}
          >
            📖
          </motion.div>
        );
      })}
    </div>
  );
};

export default WelcomeAnimation;