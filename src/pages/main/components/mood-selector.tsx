import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type MoodSelectorProps = {
  onNext: (selectedMood: string | null) => void;
};

export default function MoodSelector({ onNext }: MoodSelectorProps) {
  const { t } = useTranslation();
  const [selectedMood, setSelectedMood] = useState<string>('');

  const handleConfirm = () => {
    onNext(selectedMood);
  };

  const handleSkip = () => {
    onNext(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{t('MoodSelector.done')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card">
        <div className="flex flex-col items-center gap-4 p-5">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-3xl">👏</span>
            <span className="text-lg font-semibold">{t('MoodSelector.headerTitle')}</span>
            <span className="text-xs text-neutral-500">{t('MoodSelector.headerSubTitle')}</span>
          </div>

          <span>{t('MoodSelector.title')}</span>

          <RadioGroup value={selectedMood} onValueChange={setSelectedMood} className="w-full flex flex-col gap-2">
            <RadioGroupItem value="veryHard">😞 {t('MoodSelector.moods.veryHard')}</RadioGroupItem>
            <RadioGroupItem value="hard">😔 {t('MoodSelector.moods.hard')}</RadioGroupItem>
            <RadioGroupItem value="normal">😐 {t('MoodSelector.moods.normal')}</RadioGroupItem>
            <RadioGroupItem value="better">🙂 {t('MoodSelector.moods.better')}</RadioGroupItem>
            <RadioGroupItem value="good">😊 {t('MoodSelector.moods.good')}</RadioGroupItem>
          </RadioGroup>
        </div>

        <DialogFooter className="flex *:flex-1">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={handleSkip}>
              {t('MoodSelector.skip')}
            </Button>
          </DialogClose>

          <Button type="button" onClick={handleConfirm}>
            {t('MoodSelector.next')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
