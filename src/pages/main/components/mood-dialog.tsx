import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type MoodDialogProps = {
  onComplete: (selectedMood: string | null) => void;
};

export default function MoodDialog({ onComplete }: MoodDialogProps) {
  const { t } = useTranslation();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const onClickNext = () => {
    onComplete(selectedMood);
  };

  const onClickSkip = () => {
    onComplete(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{t('MoodDialog.done')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground">
        <div className="flex flex-col items-center gap-4 p-5">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-3xl">👏</span>
            <span className="text-lg font-semibold">{t('MoodDialog.headerTitle')}</span>
            <span className="text-xs text-neutral-500">{t('MoodDialog.headerSubTitle')}</span>
          </div>

          <span>{t('MoodDialog.title')}</span>

          <RadioGroup value={selectedMood} onValueChange={setSelectedMood} className="w-full flex flex-col gap-2">
            <RadioGroupItem value="veryHard">😞 {t('MoodDialog.moods.veryHard')}</RadioGroupItem>
            <RadioGroupItem value="hard">😔 {t('MoodDialog.moods.hard')}</RadioGroupItem>
            <RadioGroupItem value="normal">😐 {t('MoodDialog.moods.normal')}</RadioGroupItem>
            <RadioGroupItem value="better">🙂 {t('MoodDialog.moods.better')}</RadioGroupItem>
            <RadioGroupItem value="good">😊 {t('MoodDialog.moods.good')}</RadioGroupItem>
          </RadioGroup>
        </div>

        <DialogFooter className="flex">
          <DialogClose asChild>
            <Button variant="secondary" onClick={onClickSkip}>
              {t('MoodDialog.skip')}
            </Button>
          </DialogClose>
          <Button onClick={onClickNext} disabled={!selectedMood}>
            {t('MoodDialog.next')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
