import { useFunnel } from '@use-funnel/react-router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useGetProfile } from '@/api/profile/queries';
import Layout from '@/components/layout';
import FunnelSection from '@/pages/onboarding/funnel-section';

type StepNames = `step${number}`;
export type Answers = Record<number, string[]>;
export type FunnelSteps = Record<StepNames, { answers: Answers }>;
export type OnboardingFunnel = ReturnType<typeof useFunnel<FunnelSteps>>;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { data: profile } = useGetProfile();

  useEffect(() => {
    if (profile && profile.onboarding) {
      navigate('/');
    }
  }, [profile, navigate]);

  return (
    <Layout hasHeader>
      <FunnelSection />
    </Layout>
  );
}
