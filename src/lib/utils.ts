import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { TFunction } from 'i18next';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGeneralTime = (t: TFunction<'translation', undefined>, time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (minutes === 0) {
    return `${seconds}${t('common.time.secondUnit')}`;
  }
  if (seconds === 0) {
    return `${minutes}${t('common.time.minuteUnit')}`;
  }
  return `${minutes}${t('common.time.minuteUnit')} ${seconds}${t('common.time.secondUnit')}`;
};
