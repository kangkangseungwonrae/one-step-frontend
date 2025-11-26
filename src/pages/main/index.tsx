import { useFunnel } from '@use-funnel/react-router';
import Step1 from './funnel-section/step1';
import Step2 from './funnel-section/step2';

type FunnelSteps = {
	step1: { selectedId: number };
	step2: { selectedId: number }; // 빈 context
	step3: { selectedId: number };
};

export default function Main() {
	const funnel = useFunnel<FunnelSteps>({
		id: 'main',
		initial: {
			step: 'step1',
			context: { selectedId: 1 },
		},
	});

	return (
		<div className="h-full w-full">
			<funnel.Render
				step1={({ context, history }) => (
					<Step1 id={context.selectedId} onNext={(selectedId: number) => history.push('step2', { selectedId })} />
				)}
				step2={({ context, history }) => (
					<Step2
						selectedId={context.selectedId}
						onNext={(selectedId: number) => history.push('step3', { selectedId })}
						onBack={() => history.back()}
					/>
				)}
				step3={() => <div>여기 스텝3</div>}
			/>
		</div>
	);
}
