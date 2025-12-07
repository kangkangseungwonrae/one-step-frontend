import { useTranslation } from 'react-i18next';

import MoodDialog from '../components/mood-dialog';
import TaskIcon from '../components/task-icon';
import { usePostCompleteTasks } from '@/api/queries/task/usePostCompleteTasks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getGeneralTime } from '@/lib/utils';

import type { Task } from '@/api/task/dto';

type Step4Props = {
  selectedTask: Task;
  curTime: number;
  onNext: () => void;
  onBack: (pausedTime: number) => void;
};

export default function Step4({ selectedTask, curTime, onNext, onBack }: Step4Props) {
  const { id, description, icon, keywords } = selectedTask;
  const { t } = useTranslation();
  const { mutate: postCompleteTask } = usePostCompleteTasks();

  const handleComplete = () => {
    const requestBody = {
      taskId: id,
      completedAt: new Date().toISOString(), // "2025-12-07T15:30:00.000Z"
      duration: curTime,
    };
    postCompleteTask(requestBody);
    onNext();
  };

  return (
    <main className="flex h-full w-full flex-col items-center gap-4">
      <section className="flex flex-col gap-2 w-full items-center justify-center">
        <span className="text-2xl font-bold">{t('Step4.title')}</span>
        <span className="text-md">{t('Step4.subTitle')}</span>
      </section>

      <section className="w-full">
        <Card className="relative transition-colors">
          <CardContent className="flex flex-col items-center justify-center">
            <TaskIcon icon={icon.name} size="md" />
            <div className="flex flex-col gap-2 items-center justify-center">
              <span className="wrap-break-word whitespace-normal break-keep text-center font-semibold text-xl leading-snug transition-colors">
                {description}
              </span>
              <div className="flex gap-2">
                {keywords.map((keyword) => (
                  <Badge key={keyword.name} variant="outline">
                    <span className="text-card-foreground">{keyword.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 진행 시간 */}
      <Card className="w-full">
        <CardContent className="flex items-center justify-center *:font-semibold *:text-sm">
          <span>{t('Step4.timePrefix')}</span>
          <span className="mx-1 text-primary font-semibold">
            {t('Step4.timeApprox', { time: getGeneralTime(t, curTime) })}
          </span>
          <span>{t('Step4.timeSuffix')}</span>
        </CardContent>
      </Card>

      {/* 버튼 영역 */}
      <div className="flex flex-col gap-2 w-full">
        <Button variant="secondary" onClick={() => onBack(curTime)}>
          {t('Step4.not-yet')}
        </Button>
        <MoodDialog onComplete={handleComplete} />
      </div>
    </main>
  );
}
