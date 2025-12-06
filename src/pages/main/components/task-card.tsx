import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getGeneralTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

import type { Task } from '@/api/task/dto';

interface TaskCardProps {
  task: Task;
  onNext?: (task: Task) => void;
  hover?: boolean;
}

export default function TaskCard({ task, onNext, hover = false }: TaskCardProps) {
  const { t } = useTranslation();
  const { description, duration, keywords, icon } = task;

  return (
    <Card
      onClick={() => onNext && onNext(task)}
      className={cn(
        'relative transition-colors',
        hover && 'hover:border-2 hover:border-primary hover:bg-card/80 group cursor-pointer'
      )}
    >
      <CardContent className="flex aspect-square flex-col items-center justify-center gap-6">
        <span className="font-semibold text-4xl">{icon.name}</span>
        <span
          className={cn(
            'wrap-break-word whitespace-normal break-keep text-center font-semibold text-xl leading-snug transition-colors',
            hover && 'group-hover:text-primary'
          )}
          style={{ overflowWrap: 'anywhere' }}
        >
          {description}
        </span>
        <div className="flex gap-2">
          {keywords.map((keyword) => {
            return (
              <Badge key={keyword.name} variant="outline">
                <span className="text-card-foreground">{keyword.name}</span>
              </Badge>
            );
          })}
          <Badge variant="default">{getGeneralTime(t, duration)}</Badge>
        </div>
        {hover && (
          <div className="cursor-pointer h-10 bg-secondary w-fit px-4 text-secondary-foreground rounded-lg flex items-center justify-center absolute left-1/2 -translate-x-1/2 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity">
            {t('TaskCard.tap')}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
