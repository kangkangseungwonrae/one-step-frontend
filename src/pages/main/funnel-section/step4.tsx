import { Dialog } from '@radix-ui/react-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { CAROUSEL_MOCK_DICT } from '@/mocks/data';

type Step4Props = {
	selectedId: number;
	curTime: number;
	onNext: () => void;
	onBack: (pausedTime: number) => void;
};

/**
 * 초 -> 00분 00초 형식으로 변환, 분이 0일 경우에는 00초 형식으로 변환
 * @param time 초 단위의 시간
 * @returns 포맷팅된 시간 문자열
 */
const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	if (minutes === 0) {
		return `${seconds}초`;
	}

	return `${minutes}분${seconds}초`;
};

/**
 * Step4: 행동 완료 후 확인
 * @param selectedId: Step1에서 선택된 행동의 id
 * @param curTime: Step3에서 진행된 시간
 * @param onNext: 다음 단계로 이동하는 콜백 함수
 * @param onBack: 이전 단계로 이동하는 콜백 함수
 * @returns
 */
export default function Step4({ selectedId, curTime, onNext, onBack }: Step4Props) {
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
			<section className="flex w-full max-w-sm gap-2">
				<Card className="w-full">
					<CardContent className="flex flex-col items-center justify-center">
						<span className="font-semibold text-neutral-800 text-sm">
							이번 행동을 약 {formatTime(curTime)} 동안 해냈어요.
						</span>
					</CardContent>
				</Card>
			</section>
			<section className="flex w-full max-w-sm flex-col gap-2">
				<Button variant="secondary" onClick={() => onBack(curTime)}>
					아직 안 끝남
				</Button>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">Share</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<div className="flex items-center gap-2">
							<span>지금 기분은 어느 쪽에 가까운가요?</span>
							<Button variant="ghost" size="icon" className="p-0">
								❓
							</Button>
						</div>
						<DialogFooter className="flex *:flex-1">
							<DialogClose asChild>
								<Button type="button" variant="secondary">
									Close
								</Button>
							</DialogClose>
							<Button type="button" onClick={onNext}>
								다음
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</section>
		</main>
	);
}
