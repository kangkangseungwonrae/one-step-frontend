import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CAROUSEL_MOCK_DICT } from "@/mocks/data";

type Step4Props = {
  selectedId: number;
  curTime: number;
  onNext: () => void;
};

// 초를 00분 00초 형식으로 변환
// minutes이 0인 경우 초 단위만 표시
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  if (minutes === 0) {
    return `${seconds}초`;
  }

  return `${minutes}분${seconds}초`;
};

export default function Step4({ selectedId, curTime, onNext }: Step4Props) {
  const { task, keyword } = CAROUSEL_MOCK_DICT[selectedId];

  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <section></section>
      <section className="flex flex-col items-center justify-center gap-2">
        <Card className="w-full max-w-sm">
          <CardContent className="flex flex-col items-center justify-center gap-6">
            <span className="font-semibold text-4xl">🍎</span>
            <span className="font-semibold text-xl">{task}</span>
            <Badge variant="default">{keyword}</Badge>
          </CardContent>
        </Card>
      </section>
      <section className="flex gap-2">
        <Card className="w-full max-w-sm">
          <CardContent className="flex flex-col items-center justify-center ">
            <span className="font-semibold text-sm text-neutral-800">
              이번 행동을 약 {formatTime(curTime)} 동안 해냈어요.
            </span>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
