import { useFunnel } from '@use-funnel/react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useGetProfile } from '@/api/queries/profile';
import Layout from '@/components/layout';

import Step1 from './funnel-section/step1';
import Step2 from './funnel-section/step2';
import Step3 from './funnel-section/step3';
import Step4 from './funnel-section/step4';
import FunnelProvider from './stores/funnel.provider';

type FunnelSteps = {
  step1: object;
  step2: object;
  step3: object;
  step4: { curTime: number };
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
    <FunnelProvider>
      <Layout hasHeader hasNav>
        <funnel.Render
          step1={({ history }) => <Step1 onNext={() => history.push('step2')} />}
          step2={({ history }) => <Step2 onNext={() => history.push('step3')} onBack={() => history.back()} />}
          step3={({ history }) => <Step3 onNext={(curTime: number) => history.push('step4', { curTime })} />}
          step4={({ context, history }) => <Step4 curTime={context.curTime} onBack={() => history.back()} />}
        />
      </Layout>
    </FunnelProvider>
  );
}
