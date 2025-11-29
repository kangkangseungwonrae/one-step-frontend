import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CAROUSEL_MOCK_DICT } from '@/mocks/data';

import { getGeneralTime } from './step1';

type Step2Props = {
  selectedId: number;
  onNext: (id: number) => void;
  onBack: () => void;
};

/**
 * Step2: 선택된 행동을 보여줌(확인용)
 * @param selectedId: Step1에서 선택된 행동의 id
 * @param onNext: 다음 단계로 이동하는 콜백 함수
 * @param onBack: 이전 단계로 이동하는 콜백 함수
 */
export default function Step2({ selectedId, onNext, onBack }: Step2Props) {
  const { id, task, time, keyword } = CAROUSEL_MOCK_DICT[selectedId];
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <section>
        <div>어 너 이거 골랐구나 한 번 해봐</div>
      </section>
      <section className="w-full max-w-sm">
        <div className="p-1">
          <Card onClick={() => onNext(selectedId)}>
            <CardContent className="flex aspect-square flex-col items-center justify-center gap-6 p-6">
              <span className="font-semibold text-4xl">🍎</span>
              <span
                className="wrap-break-word whitespace-normal break-keep text-center font-semibold text-xl leading-snug"
                style={{ overflowWrap: 'anywhere' }}
              >
                {task}
              </span>
              <div className="flex gap-2">
                <Badge variant="default">{keyword}</Badge>
                <Badge variant="outline">{getGeneralTime(time)}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="flex w-full max-w-sm flex-col gap-2">
        <Button variant="secondary" onClick={() => onNext(id)}>
          시작하기
        </Button>
        <Button onClick={onBack}>다른 행동 선택</Button>
      </section>
    </main>
  );
}
