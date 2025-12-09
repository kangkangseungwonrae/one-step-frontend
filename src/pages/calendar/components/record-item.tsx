import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';
import { getGeneralTime } from '@/lib/utils';

import type { CompletedTask } from '@/api/task/dto';

interface RecordItemProps {
  completedTask: CompletedTask;
}

export default function RecordItem({ completedTask }: RecordItemProps) {
  const { t } = useTranslation();
  const { duration } = completedTask;
  const { keywords, description } = completedTask.task;

  const endTime = dayjs(completedTask.completedAt);
  const startTime = endTime.subtract(completedTask.duration, 'second');

  return (
    <div className="flex flex-col gap-2 bg-muted p-4 rounded-md">
      <div className="flex gap-2">
        {keywords.map((keyword, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Badge size="sm" variant="secondary" key={`${index} - ${keyword.name}`}>
              {keyword.name}
            </Badge>
          );
        })}
      </div>
      <div>
        <span>{description}</span>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 *:text-xs *:text-neutral-500">
          <span>{dayjs(startTime).format('hh:mm')}</span>
          <span>{`->`}</span>
          <span>{dayjs(endTime).format('hh:mm')}</span>
        </div>
        <Badge size="sm">{getGeneralTime(t, duration)}</Badge>
      </div>
    </div>
  );
}
