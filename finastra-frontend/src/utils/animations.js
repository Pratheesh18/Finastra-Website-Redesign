import { useEffect, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};


export const floatAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const shimmerEffect = {
  backgroundPosition: ["200% 0", "-200% 0"],
  transition: {
    repeat: Infinity,
    duration: 3,
    ease: "linear"
  }
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity }
};


export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const itemFadeIn = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

export const useScrollAnimation = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls, variants: fadeIn };
};

export const useRevealAnimation = (options = {}) => {
  const { threshold = 0.2, triggerOnce = true, delay = 0 } = options;
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay
      }
    }
  };

  return { ref, controls, variants };
};


export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return {
    y: offset * speed
  };
};


export const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);
  
  return displayText;
};


export const useTiltEffect = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const element = e.currentTarget;
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setTilt({
      x: (x - 0.5) * 20, // -10 to 10 degrees
      y: (y - 0.5) * -20 // -10 to 10 degrees
    });
  };
  
  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };
  
  return {
    transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
    handleMouseMove,
    handleMouseLeave
  };
};


export const useCounter = (end, start = 0, duration = 2000) => {
  const [count, setCount] = useState(start);
  const [ref, inView] = useInView({ triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      let startTime;
      let animationFrame;
      
      const animate = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, start, end, duration]);
  
  return { count, ref };
};


export const generateParticles = (count = 30) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 1,
    speed: Math.random() * 1 + 0.1
  }));
};