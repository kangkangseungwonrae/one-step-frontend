import { useTranslation } from 'react-i18next';

import MoodSelector from '../components/mood-selector';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import type { Task } from '@/api/task/dto';

type Step4Props = {
  selectedTask: Task;
  curTime: number;
  onNext: () => void;
  onBack: (pausedTime: number) => void;
};

export default function Step4({ selectedTask, curTime, onNext, onBack }: Step4Props) {
  const { description, icon, keywords } = selectedTask;
  const { t } = useTranslation();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const minUnit = t('common.time.minuteUnit');
    const secUnit = t('common.time.secondUnit');

    if (minutes === 0) return `${seconds}${secUnit}`;
    if (seconds === 0) return `${minutes}${minUnit}`;

    return `${minutes}${minUnit} ${seconds}${secUnit}`;
  };

  return (
    <main className="flex h-full w-full flex-col items-center justify-center gap-4">
      <section className="flex flex-col gap-2 w-full items-center justify-center">
        <span className="text-2xl font-bold">{t('Step4.title')}</span>
        <span className="text-md">{t('Step4.subTitle')}</span>
      </section>

      <section className="w-full">
        <Card className="relative transition-colors">
          <CardContent className="flex flex-col items-center justify-center gap-4">
            <span className="font-semibold text-4xl">{icon.name} icon</span>
            <span className="wrap-break-word whitespace-normal break-keep text-center font-semibold text-xl leading-snug transition-colors">
              {description}
            </span>

            <div className="flex gap-2">
              {keywords.map((keyword) => (
                <Badge key={keyword.name} variant="outline">
                  {keyword.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 진행 시간 */}
      <Card className="w-full">
        <CardContent className="flex items-center justify-center *:font-semibold *:text-sm">
          <span>{t('Step4.timePrefix')}</span>
          <span className="mx-1 text-secondary font-semibold">
            {t('Step4.timeApprox', { time: formatTime(curTime) })}
          </span>
          <span>{t('Step4.timeSuffix')}</span>
        </CardContent>
      </Card>

      {/* 버튼 영역 */}
      <div className="flex flex-col gap-2 w-full">
        <Button variant="secondary" onClick={() => onBack(curTime)}>
          {t('Step4.not-yet')}
        </Button>
        <MoodSelector onNext={onNext} />
      </div>
    </main>
  );
}
