import { useFunnel } from '@use-funnel/react-router';

import { useGetTasks } from '@/api/queries/useGetTasks';
import Layout from '@/components/layout';

import Step1 from './funnel-section/step1';
import Step2 from './funnel-section/step2';
import Step3 from './funnel-section/step3';
import Step4 from './funnel-section/step4';

type FunnelSteps = {
  step1: { selectedId: number };
  step2: { selectedId: number }; // 빈 context
  step3: { selectedId: number; pausedTime?: number }; // 타이머
  step4: { selectedId: number; curTime: number }; // 결과
};

export default function Main() {
  const funnel = useFunnel<FunnelSteps>({
    id: 'main',
    initial: {
      step: 'step1',
      context: { selectedId: 1 },
    },
  });

  const { data: tasks } = useGetTasks({
    limit: 10,
    categories: ['Mental Health'],
    keywords: ['exercise'],
  });

  if (!tasks) return <div>Loading...</div>;

  console.log('tasks: ', tasks?.length);

  // useEffect(() => {
  //   // 온보딩이 안되어 있으면 온보딩 페이지로 리다이렉트
  //   if (profile && !profile.onboarding) {
  //     navigate('/onboarding');
  //   }
  // }, []);

  return (
    <Layout header nav>
      <funnel.Render
        step1={({ history }) => <Step1 onNext={(selectedId: number) => history.push('step2', { selectedId })} />}
        step2={({ context, history }) => (
          <Step2
            selectedId={context.selectedId}
            onNext={(selectedId) =>
              history.push('step3', {
                ...context,
                selectedId,
                pausedTime: 0,
              })
            }
            onBack={() => history.back()}
          />
        )}
        step3={({ context, history }) => (
          <Step3
            selectedId={context.selectedId}
            pausedTime={context.pausedTime}
            onNext={(selectedId: number, curTime: number) => history.push('step4', { selectedId, curTime })}
          />
        )}
        step4={({ context, history }) => (
          <Step4
            selectedId={context.selectedId}
            curTime={context.curTime}
            onNext={() => history.push('step1')}
            onBack={(pausedTime: number) => history.push('step3', { ...context, pausedTime })}
          />
        )}
      />
    </Layout>
  );
}
