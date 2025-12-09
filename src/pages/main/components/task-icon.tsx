import { motion } from 'motion/react';

import { getEmojiForIcon } from '@/lib/utils';

type IconSize = 'sm' | 'md' | 'lg';

interface TaskIconProps {
  icon: string;
  size?: IconSize;
}

const sizeConfig = {
  sm: {
    container: 'w-16 h-16',
    text: 'text-4xl',
    motion: 2,
  },
  md: {
    container: 'w-24 h-24',
    text: 'text-6xl',
    motion: 3,
  },
  lg: {
    container: 'w-32 h-32',
    text: 'text-8xl',
    motion: 5,
  },
};

export default function TaskIcon({ icon, size = 'lg' }: TaskIconProps) {
  const config = sizeConfig[size];

  return (
    <motion.div
      className={`${config.container} ${config.text} flex items-center justify-center`}
      animate={{
        y: [-config.motion, config.motion, -config.motion],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {getEmojiForIcon(icon)}
    </motion.div>
  );
}
