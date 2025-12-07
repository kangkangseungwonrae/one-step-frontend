import { useFunnel } from '@use-funnel/react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useGetProfile } from '@/api/queries/profile';
import Layout from '@/components/layout';

import Step1 from './funnel-section/step1';
import Step2 from './funnel-section/step2';
import Step3 from './funnel-section/step3';
import Step4 from './funnel-section/step4';

import type { Task } from '@/api/task/dto';

type FunnelSteps = {
  step1: object;
  step2: { selectedTask: Task };
  step3: { selectedTask: Task; pausedTime?: number };
  step4: { selectedTask: Task; curTime: number };
};

export default function MainPage() {
  const navigate = useNavigate();

  const { data: profile } = useGetProfile();
  const funnel = useFunnel<FunnelSteps>({
    id: 'main',
    initial: {
      step: 'step1',
      context: {},
    },
  });

  useEffect(() => {
    if (profile && !profile.onboarding) {
      navigate('/onboarding');
    }
  }, [profile, navigate]);

  return (
    <Layout hasHeader hasNav>
      <funnel.Render
        step1={({ history }) => <Step1 onNext={(selectedTask: Task) => history.push('step2', { selectedTask })} />}
        step2={({ context, history }) => (
          <Step2
            selectedTask={context.selectedTask}
            onNext={(selectedTask: Task) =>
              history.push('step3', {
                selectedTask,
                pausedTime: 0,
              })
            }
            onBack={() => history.back()}
          />
        )}
        step3={({ context, history }) => (
          <Step3
            selectedTask={context.selectedTask}
            pausedTime={context.pausedTime}
            onNext={(selectedTask: Task, curTime: number) => history.push('step4', { selectedTask, curTime })}
          />
        )}
        step4={({ context, history }) => (
          <Step4
            selectedTask={context.selectedTask}
            curTime={context.curTime}
            onNext={() => history.push('step1')}
            onBack={(pausedTime: number) => history.push('step3', { selectedTask: context.selectedTask, pausedTime })}
          />
        )}
      />
    </Layout>
  );
}
