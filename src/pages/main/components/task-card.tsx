import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { getGeneralTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

import TaskIcon from './task-icon';

import type { Task } from '@/api/task/dto';

interface TaskCardProps {
  task: Task | null;
  onClick?: () => void;
  hover?: boolean;
}

export default function TaskCard({ task, onClick, hover = false }: TaskCardProps) {
  const { t } = useTranslation();
  if (!task) {
    return (
      <Card className="bg-card">
        <CardContent className="flex aspect-square flex-col items-center justify-center text-muted-foreground">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/50 mb-4">
            <span>❌</span>
          </div>
          <span className="text-sm font-medium">{t('TaskCard.empty')}</span>
        </CardContent>
      </Card>
    );
  }

  const { description, duration, keywords, icon } = task;

  return (
    <Card
      onClick={onClick}
      className={cn(
        'relative transition-colors',
        hover && 'hover:border-2 hover:border-primary hover:bg-card/80 group cursor-pointer'
      )}
    >
      <CardContent className="flex aspect-square flex-col items-center justify-center gap-6">
        <div className="flex flex-col justify-center items-center">
          <TaskIcon icon={icon.name} />
          <span
            className={cn(
              'wrap-break-word whitespace-normal break-keep text-center font-semibold text-xl leading-snug transition-colors',
              hover && 'group-hover:text-primary'
            )}
            style={{ overflowWrap: 'anywhere' }}
          >
            {description}
          </span>
        </div>
        <div className="flex gap-2">
          {keywords.map((keyword) => {
            return (
              <Badge key={keyword.name} variant="secondary">
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
