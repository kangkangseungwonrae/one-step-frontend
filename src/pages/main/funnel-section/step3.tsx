import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CAROUSEL_MOCK_DICT } from "@/mocks/data";
import { useEffect, useState } from "react";

type Step3Props = {
  selectedId: number;
  onNext: (selectedId: number, curTime: number) => void;
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default function Step3({ selectedId, onNext }: Step3Props) {
  const { task } = CAROUSEL_MOCK_DICT[selectedId];

  const [isPaused, setIsPaused] = useState(false);
  const [curTime, setCurTime] = useState<number>(0);

  // 컴포넌트 렌더링 하자마자 타이머 시작
  useEffect(() => {
    // isPaused가 true이면 타이머 중지
    if (isPaused) return;

    // 1초마다 시간 증가
    const timer = setTimeout(() => {
      setCurTime((prev) => prev + 1);
    }, 1000);

    // cleanup: 컴포넌트 언마운트 또는 재렌더링 시 타이머 정리
    return () => clearTimeout(timer);
  }, [curTime, isPaused]);

  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <section></section>
      <section className="flex flex-col items-center justify-center gap-2">
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-8">
            <span className="font-semibold text-xl">{task}</span>
            <span className="font-semibold text-4xl tabular-nums ">
              {formatTime(curTime)}
            </span>
            <span className="font-semibold text-sm text-neutral-400">
              {isPaused ? "일시정지" : "진행중..."}
            </span>
          </CardContent>
        </Card>
      </section>
      <section className="flex gap-2">
        <Button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? "시작하기" : "일시정지"}
        </Button>
        <Button onClick={() => onNext(selectedId, curTime)}>종료하기</Button>
      </section>
    </main>
  );
}
