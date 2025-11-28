import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CAROUSEL_MOCK_DICT } from '@/mocks/data';

type Step3Props = {
	selectedId: number;
	pausedTime?: number;
	onNext: (selectedId: number, curTime: number) => void;
};

const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Step3: 선택된 행동의 타이머 진행 컴포넌트
 * @param selectedId: Step1에서 선택된 행동의 id
 * @param pausedTime: Step4에서 다시 Step3으로 이동했을 때 진행했던 시간 복구용
 * @param onNext: 행동 완료 후 다음 단계로 이동하는 콜백 함수
 */
export default function Step3({ selectedId, pausedTime = 0, onNext }: Step3Props) {
	const { task } = CAROUSEL_MOCK_DICT[selectedId];

	const [isPaused, setIsPaused] = useState(false);
	const [curTime, setCurTime] = useState<number>(pausedTime);

	useEffect(() => {
		if (isPaused) return;

		const interval = setInterval(() => {
			setCurTime((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [isPaused]);

	return (
		<main className="flex h-full flex-col items-center justify-center gap-4">
			<section></section>
			<section className="flex flex-col items-center justify-center gap-2">
				<Card>
					<CardContent className="flex flex-col items-center justify-center gap-8">
						<span className="font-semibold text-xl">{task}</span>
						<span className="font-semibold text-4xl tabular-nums">{formatTime(curTime)}</span>
						<span className="font-semibold text-neutral-400 text-sm">{isPaused ? '일시정지' : '진행중...'}</span>
					</CardContent>
				</Card>
			</section>
			<section className="flex gap-2">
				<Button onClick={() => setIsPaused(!isPaused)}>{isPaused ? '시작하기' : '일시정지'}</Button>
				<Button onClick={() => onNext(selectedId, curTime)}>종료하기</Button>
			</section>
		</main>
	);
}
