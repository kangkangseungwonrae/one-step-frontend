import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import useFunnelStore from '../stores/useFunnelStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getEmojiForIcon } from '@/lib/utils';

type Step3Props = {
  pausedTime?: number;
  onNext: (curTime: number) => void;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function Step3({ pausedTime = 0, onNext }: Step3Props) {
  const navigate = useNavigate();
  const selectedTask = useFunnelStore((state) => state.selectedTask);

  // Redirect if no selected task
  useEffect(() => {
    if (!selectedTask) {
      navigate('/', { replace: true });
    }
  }, [selectedTask, navigate]);

  const { t } = useTranslation();
  const [isPaused, setIsPaused] = useState(false);
  const [curTime, setCurTime] = useState(pausedTime);

  // Initialize time on mount or when pausedTime changes
  useEffect(() => {
    setCurTime(pausedTime);
    setIsPaused(false);
  }, [selectedTask, pausedTime]);

  // Timer effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  if (!selectedTask) return null;
  const { description, icon } = selectedTask;

  return (
    <main className="flex h-full w-full flex-col items-center gap-4">
      <section className="flex w-full flex-col items-center justify-center gap-2">
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center gap-6">
            <div className="flex items-center">
              <span className="text-3xl">{getEmojiForIcon(icon.name)}</span>
              <span className="font-semibold text-xl">{description}</span>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <span className="font-black text-4xl tabular-nums">{formatTime(curTime)}</span>
              <span className="font-semibold text-neutral-400 text-sm">
                {isPaused ? t('Step3.pause') : `${t('Step3.progress')}...`}
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-2 w-full">
        <Button variant={isPaused ? 'secondary' : 'outline'} onClick={() => setIsPaused((prev) => !prev)}>
          {isPaused ? t('Step3.restart') : t('Step3.pause')}
        </Button>
        <Button onClick={() => onNext(curTime)} disabled={curTime <= 0}>
          {t('Step3.done')}
        </Button>
      </section>
    </main>
  );
}
