'use client';

import { motion, useScroll } from 'framer-motion';

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="reading-progress"
      style={{ scaleX: scrollYProgress }}
    >
      <div className="bar" />
    </motion.div>
  );
}
