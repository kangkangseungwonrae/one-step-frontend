import { useFunnel } from '@use-funnel/react-router';

import Layout from '@/components/layout';
import FunnelSection from '@/pages/onboarding/funnel-section';

type StepNames = `step${number}`;
export type Answers = Record<number, string[]>;
export type FunnelSteps = Record<StepNames, { answers: Answers }>;
export type OnboardingFunnel = ReturnType<typeof useFunnel<FunnelSteps>>;

export default function OnboardingPage() {
  return (
    <Layout hasHeader>
      <FunnelSection />
    </Layout>
  );
}
