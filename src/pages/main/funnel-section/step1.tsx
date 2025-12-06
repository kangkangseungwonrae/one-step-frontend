import { useTranslation } from 'react-i18next';

import TaskCard from '../components/task-card';
import { useGetProfile } from '@/api/profile/queries';
import { useGetTasks } from '@/api/queries/useGetTasks';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import type { Task } from '@/api/task/dto';

type Step1Props = {
  onNext: (task: Task) => void;
};

/**
 * Step1: 캐러셀 형식의 행동 제안 컴포넌트
 * @param onNext 다음 단계로 이동하는 콜백 함수
 */
export default function Step1({ onNext }: Step1Props) {
  const { t } = useTranslation();
  const { data: profile } = useGetProfile();
  const {
    data: tasks,
    isLoading,
    refetch,
  } = useGetTasks(
    {
      limit: 10,
      // categories: [''],
      // keywords: [''],
    },
    profile?.locale
  );

  const handleRefreshTasks = () => {
    refetch();
  };

  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <section className="flex flex-col gap-2 w-full items-center justify-center">
        <span className="text-2xl font-semibold">{t('Step1.title')}</span>
        <span className="text-md">{t('Step1.subTitle')}</span>
      </section>
      <section>
        {isLoading || !tasks ? (
          <div>loading...</div>
        ) : (
          <Carousel opts={{ loop: true }} className="w-full max-w-sm">
            <CarouselContent>
              {tasks.map((task) => {
                return (
                  <CarouselItem key={task.description}>
                    <TaskCard task={task} onNext={(task) => onNext(task)} hover />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </section>
      <div className="flex flex-col items-center gap-2 h-20">
        <span className="font-semibold text-sm">{t('Step1.swipe-task')}</span>
        <Button variant="default" onClick={handleRefreshTasks}>
          {t('Step1.view-new-task')}
        </Button>
      </div>
    </main>
  );
}
