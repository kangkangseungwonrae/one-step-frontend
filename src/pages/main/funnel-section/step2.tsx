import { useTranslation } from 'react-i18next';

import TaskCard from '../components/task-card';
import { Button } from '@/components/ui/button';

import type { Task } from '@/api/task/dto';

type Step2Props = {
  selectedTask: Task;
  onNext: (selectedTask: Task) => void;
  onBack: () => void;
};

export default function Step2({ selectedTask, onNext, onBack }: Step2Props) {
  const { t } = useTranslation();
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
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
        <Button variant="default" onClick={() => onNext(selectedTask)}>
          {t('Step2.start')}
        </Button>
        <Button variant="outline" onClick={onBack}>
          {t('Step2.other-task')}
        </Button>
      </section>
    </main>
  );
}
