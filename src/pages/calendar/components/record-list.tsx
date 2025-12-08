import { useTranslation } from 'react-i18next';

import { useGetCompletedTasks } from '@/api/queries/task';
import { Spinner } from '@/components/ui/spinner';

import RecordItem from './record-item';

import type { CompletedTask } from '@/api/task/dto';

interface RecordListProps {
  date: string;
}

export default function RecordList({ date }: RecordListProps) {
  const { t } = useTranslation();
  const { data: completedTasks, isLoading } = useGetCompletedTasks({ date });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner className="size-6" />
      </div>
    );
  }

  if (!completedTasks || completedTasks.length === 0) {
    return <div className="text-center text-muted-foreground py-8">{t('Calendar.noRecords')}</div>;
  }

  return (
    <div className="flex flex-col gap-2 overflow-auto">
      {completedTasks.map((task: CompletedTask) => (
        <RecordItem key={task.id} completedTask={task} />
      ))}
    </div>
  );
}
