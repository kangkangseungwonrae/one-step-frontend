import { useTranslation } from 'react-i18next';

import { useGetTasks } from '@/api/queries/task/useGetTasks';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import TaskCard from '@/pages/main/components/task-card';
import useFunnelStore from '@/pages/main/stores/useFunnelStore';

import type { Task } from '@/api/task/dto';

/**
 * Step1: 캐러셀 형식의 행동 제안 컴포넌트
 * @param onNext 다음 단계로 이동하는 콜백 함수
 */
export default function Step1({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  const setSelectedTask = useFunnelStore((state) => state.setSelectedTask);

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useGetTasks({
    limit: 10,
    // categories: [''],
    // keywords: [''],
  });

  const handleRefreshTasks = () => {
    refetch();
  };

  const onClickTask = (task: Task) => {
    setSelectedTask(task);
    onNext();
  };

  return (
    <main className="flex h-full flex-col items-center gap-4">
      <section className="flex flex-col gap-2 w-full items-center justify-center">
        <span className="text-2xl font-bold text-center">{t('Step1.title')}</span>
        <span>{t('Step1.subTitle')}</span>
      </section>
      <section>
        {isLoading || !tasks ? (
          <div>loading...</div>
        ) : (
          <Carousel opts={{ loop: true }} className="w-full max-w-sm">
            <CarouselContent>
              {tasks.map((task) => {
                return (
                  <CarouselItem key={task.id}>
                    <TaskCard task={task} onClick={() => onClickTask(task)} hover />
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
