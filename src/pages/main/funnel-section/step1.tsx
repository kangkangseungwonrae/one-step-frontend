import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { CAROUSEL_MOCK_DATA } from '@/mocks/data';

type Step1Props = {
  onNext: (id: number) => void;
};

export const getGeneralTime = (time: 60 | 300 | 600) => {
  if (time === 60) return '지금';
  if (time === 300) return '5분';
  if (time === 600) return '10분';
};

/**
 * Step1: 캐러셀 형식의 행동 제안 컴포넌트
 * @param onNext 다음 단계로 이동하는 콜백 함수
 */
export default function Step1({ onNext }: Step1Props) {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <section>
        <div>하이루^^ 오늘 뭐 해볼지 하나 정해봐.</div>
      </section>
      <section>
        <Carousel className="w-full max-w-sm">
          <CarouselContent>
            {CAROUSEL_MOCK_DATA.map((item) => {
              return (
                <CarouselItem key={item.id}>
                  <div className="p-1">
                    <Card onClick={() => onNext(item.id)}>
                      <CardContent className="flex aspect-square flex-col items-center justify-center gap-6 p-6">
                        <span className="font-semibold text-4xl">🍎</span>
                        <span
                          className="wrap-break-word whitespace-normal break-keep text-center font-semibold text-xl leading-snug"
                          style={{ overflowWrap: 'anywhere' }}
                        >
                          {item.task}
                        </span>
                        <div className="flex gap-2">
                          <Badge variant="default">{item.keyword}</Badge>
                          <Badge variant="outline">{getGeneralTime(item.time)}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <div className="flex flex-col items-center gap-2">
        <span className="font-semibold text-neutral-600 text-sm">좌우로 스와이프하여 다른 행동을 볼 수 있어요</span>
        <Button variant="secondary">새로운 행동 보기</Button>
      </div>
    </main>
  );
}
