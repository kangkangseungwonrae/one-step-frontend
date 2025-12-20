import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useShallow } from 'zustand/react/shallow';

import useFunnelStore from '../stores/useFunnelStore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface MoodDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onNext?: () => void;
}

export default function MoodDialog({ isOpen, setIsOpen, onNext }: MoodDialogProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedMood, setSelectedMood] = useFunnelStore(
    useShallow((state) => [state.selectedMood, state.setSelectedMood])
  );

  // 건너뛰기/다음 버튼 클릭 시 공통 로직
  const proceed = () => {
    setIsOpen(false);
    onNext?.(); // QuestionDialog 열기
  };

  const handleSkip = () => {
    setSelectedMood(null);
    proceed();
  };

  // 다이얼로그 외부 클릭이나 닫기 버튼으로 닫힐 때 처리
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      navigate('/');
    }
    setIsOpen(open);
  };

  // TODO: selectedMood 초기화

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="w-md bg-card text-card-foreground">
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
          <DialogFooter className="flex flex-row gap-2 px-5">
            <Button variant="secondary" onClick={handleSkip}>
              {t('MoodDialog.skip')}
            </Button>
            <Button className="flex-1" variant="default" onClick={proceed} disabled={!selectedMood}>
              {t('MoodDialog.next')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
