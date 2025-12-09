import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { TFunction } from 'i18next';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGeneralTime(t: TFunction, time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const minUnit = t('common.time.minuteUnit');
  const secUnit = t('common.time.secondUnit');

  if (minutes === 0) return `${seconds}${secUnit}`;
  if (seconds === 0) return `${minutes}${minUnit}`;

  return `${minutes}${minUnit} ${seconds}${secUnit}`;
}

export function getEmojiForIcon(iconName: string) {
  const mapping: { [key: string]: string } = {
    health: '💊',
    exercise: '💪',
    rest: '😴',
    organization: '📋',
    productivity: '⚡',
    hygiene: '🧼',
  };

  return mapping[iconName] || '❓'; // 없으면 물음표
}
