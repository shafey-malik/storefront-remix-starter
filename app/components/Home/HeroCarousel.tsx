import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import heroDiamond1 from '~/components/assets/hero-diamond-1.jpg';
import heroDiamond2 from '~/components/assets/hero-diamond-2.jpg';
import heroDiamond3 from '~/components/assets/hero-diamond-3.jpg';
import heroDiamond4 from '~/components/assets/hero-diamond-4.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';

const slides = [
  {
    id: 1,
    image: heroDiamond1,
    title: 'Timeless Elegance',
    subtitle: 'Classic solitaire engagement rings',
    description:
      'Discover the perfect symbol of eternal love with our exquisite collection of diamond solitaires.',
  },
  {
    id: 2,
    image: heroDiamond2,
    title: 'Rose Gold Romance',
    subtitle: 'Warm and sophisticated emerald cuts',
    description:
      'Embrace modern luxury with our stunning emerald cut diamonds in romantic rose gold settings.',
  },
  {
    id: 3,
    image: heroDiamond3,
    title: 'Oval Cut Perfection',
    subtitle: 'Elegant oval diamonds with pavé detail',
    description:
      'Experience the brilliance of oval diamonds complemented by delicate pavé craftsmanship.',
  },
  {
    id: 4,
    image: heroDiamond4,
    title: 'Platinum Prestige',
    subtitle: 'Ultimate luxury in platinum settings',
    description:
      'Indulge in the finest platinum settings featuring our most brilliant round diamonds.',
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to clear any existing timer
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Function to start a new timer
  const startTimer = () => {
    clearTimer(); // Clear any existing timer first
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
  };

  // Initialize timer on mount and clean up on unmount
  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startTimer(); // Reset timer when manually changing slides
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startTimer(); // Reset timer
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startTimer(); // Reset timer
  };

  return (
    <div className="relative h-[80vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-hero-gradient">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {/* Stack content vertically on mobile */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 h-full">
            {/* Content - takes only needed space on mobile */}
            <div className="px-4 sm:px-6 lg:px-16 xl:px-24 py-6 sm:py-8 lg:py-0 z-10 flex flex-col justify-center bg-[hsl(var(--background))] lg:bg-transparent">
              <motion.div
                initial={{ y: 20, opacity: 0.1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-xl mx-auto lg:mx-0 w-full space-y-3 sm:space-y-4"
              >
                <div className="space-y-1 sm:space-y-2">
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[hsl(var(--muted-foreground))] font-luxury-sans text-xs sm:text-sm uppercase tracking-widest"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
                  <motion.h1
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1.5 }}
                    className="font-luxury-serif text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-[hsl(var(--primary))] leading-snug sm:leading-tight"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>
                </div>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-[hsl(var(--muted-foreground))] font-luxury-sans text-base sm:text-lg leading-relaxed"
                >
                  {slides[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
                >
                  <Button className="btn-luxury px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Book Consultation
                  </Button>
                  <Button
                    variant="outline"
                    className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--secondary))]"
                  >
                    View Collection
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Image - full width on mobile */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0.1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 2 }}
              className="relative flex-1 min-h-[40vh] lg:min-h-0 w-full"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--background))] lg:bg-gradient-to-r lg:from-[hsl(var(--background))] lg:via-transparent lg:to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - smaller on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={prevSlide}
          className="absolute left-2 sm:left-6 top-1/2 transform -translate-y-1/2 bg-[hsl(var(--card))] hover:bg-[hsl(var(--surface-luxury))] shadow-[var(--shadow-card))] p-2 sm:p-3 z-50"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={nextSlide}
          className="absolute right-2 sm:right-6 top-1/2 transform -translate-y-1/2 bg-[hsl(var(--card))] hover:bg-[hsl(var(--surface-luxury))] shadow-[var(--shadow-card))] p-2 sm:p-3 z-50"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute left-[47.5%] bottom-4 sm:bottom-8 transform -translate-x-1/2 flex space-x-2 sm:space-x-3"
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-300 ${
              index === currentSlide
                ? 'bg-[hsl(var(--platinum))]'
                : 'bg-[hsl(var(--gold))] hover:bg-[hsl(var(--muted))]'
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default HeroCarousel;
