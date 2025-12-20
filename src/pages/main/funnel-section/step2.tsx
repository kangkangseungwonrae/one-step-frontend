import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import TaskCard from '../components/task-card';
import useFunnelStore from '../stores/useFunnelStore';
import { Button } from '@/components/ui/button';

type Step2Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function Step2({ onNext, onBack }: Step2Props) {
  const { t } = useTranslation();
  const selectedTask = useFunnelStore((state) => state.selectedTask);

  // selectedTask가 null이면 step1으로 돌아가기
  useEffect(() => {
    if (!selectedTask) {
      onBack();
    }
  }, [selectedTask, onBack]);

  if (!selectedTask) {
    return null;
  }

  return (
    <main className="flex h-full flex-col items-center gap-4">
      <section className="flex flex-col gap-2 w-full items-center justify-center">
        <span className="text-2xl font-semibold">{t('Step2.title')}</span>
        <span className="text-md">{t('Step2.subTitle')}</span>
      </section>
      <section className="w-full max-w-sm">
        <div className="p-1">
          <TaskCard task={selectedTask} />
        </div>
      </section>
      <section className="flex w-full max-w-sm flex-col gap-2">
        <Button variant="default" onClick={onNext}>
          {t('Step2.start')}
        </Button>
        <Button variant="outline" onClick={onBack}>
          {t('Step2.other-task')}
        </Button>
      </section>
    </main>
  );
}
