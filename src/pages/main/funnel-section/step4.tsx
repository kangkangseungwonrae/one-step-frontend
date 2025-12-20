import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import MoodDialog from '../components/mood-dialog';
import QuestionDialog from '../components/question-dialog';
import TaskIcon from '../components/task-icon';
import useFunnelStore from '../stores/useFunnelStore';
import { useGetFollowingQuestion, usePostCompleteTasks } from '@/api/queries/task';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getGeneralTime } from '@/lib/utils';

type Step4Props = {
  curTime: number;
  onBack: (pausedTime: number) => void;
};

export default function Step4({ curTime, onBack }: Step4Props) {
  const navigate = useNavigate();
  const selectedTask = useFunnelStore((state) => state.selectedTask);

  const [isMoodDialogOpen, setIsMoodDialogOpen] = useState(false);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = useState(false);

  const { mutate: postCompleteTask } = usePostCompleteTasks();
  const { data: followingQuestion } = useGetFollowingQuestion({ categories: ['정신 건강', '회복탄력성'] });

  useEffect(() => {
    if (!selectedTask) {
      navigate('/', { replace: true });
    }
  }, [selectedTask, navigate]);

  if (!selectedTask) {
    return null;
  }

  const { description, icon, keywords } = selectedTask;
  const { t } = useTranslation();

  const handlePostCompleteTask = () => {
    setIsMoodDialogOpen(true);

    const requestBody = {
      taskId: selectedTask.id,
      completedAt: dayjs().utc().toISOString(),
      duration: curTime,
    };

    postCompleteTask(requestBody);
  };

  if (!selectedTask) return null;

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
        <Button variant="default" onClick={handlePostCompleteTask}>
          {t('Step4.done')}
        </Button>
      </div>

      <MoodDialog
        isOpen={isMoodDialogOpen}
        setIsOpen={setIsMoodDialogOpen}
        onNext={() => {
          if (followingQuestion) {
            setIsQuestionDialogOpen(true);
          } else {
            navigate('/', { replace: true });
          }
        }}
      />
      <QuestionDialog isOpen={isQuestionDialogOpen} setIsOpen={setIsQuestionDialogOpen} />
    </main>
  );
}
