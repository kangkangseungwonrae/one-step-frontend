import { useFunnel } from '@use-funnel/react-router';
import { useNavigate } from 'react-router';

import Layout from '@/components/layout';
import FunnelSection from '@/pages/onboarding/funnel-section';

export type Question = {
  stepNumber: number;
  category: string;
  title: string;
  options: string[];
  multiple?: boolean;
};

export const ONBOARDING_QUESTIONS: Question[] = [
  {
    stepNumber: 0,
    category: '반려동물',
    title: '반려동물이 있나요?',
    options: ['고양이', '강아지', '없다', '기타'],
    multiple: true,
  },
  {
    stepNumber: 1,
    category: '운동 경험',
    title: '예전에 좋아했던 운동이 있나요?',
    options: ['요가', '자전거', '스트레칭', '러닝', '헬스', '없다'],
    multiple: true,
  },
  {
    stepNumber: 2,
    category: '식물/자연',
    title: '집에서 식물을 키우고 있나요?',
    options: ['있다', '없다'],
    multiple: false,
  },
  {
    stepNumber: 3,
    category: '회복탄력성',
    title: '힘들 때, 그나마 도움이 되었던 행동이 있다면 무엇인가요?',
    options: ['산책', '요리', '간단한 운동', '따뜻한 물로 샤워하기', '신나는 음악 듣기'],
    multiple: true,
  },
  {
    stepNumber: 4,
    category: '음악 취향',
    title: '자주 듣는 음악 장르는?',
    options: ['팝', '인디', '힙합', '발라드', '클래식', '로파이'],
    multiple: true,
  },
  {
    stepNumber: 5,
    category: '휴식 방식',
    title: '쉬는 시간에 가장 자주 하는 건?',
    options: ['음악 듣기', '영상 보기', '누워있기', '산책', '독서'],
    multiple: true,
  },
  {
    stepNumber: 6,
    category: '외출 성향',
    title: '집 근처에서 자주 가는 곳이 있나요?',
    options: ['편의점', '카페', '공원', '마트', '없다'],
    multiple: true,
  },
  {
    stepNumber: 7,
    category: '공간 선호',
    title: '집에서 제일 오래 있는 공간은?',
    options: ['침대', '책상', '소파', '주방', '기타'],
    multiple: true,
  },
];

type StepNames = `step${number}`;
type Answers = Record<number, string[]>;
type FunnelSteps = Record<StepNames, { answers: Answers }>;

export default function Onboarding() {
  const navigate = useNavigate();
  const funnel = useFunnel<FunnelSteps>({
    id: 'onboarding',
    initial: {
      step: 'step0',
      context: { answers: {} as Answers },
    },
  });

  const currentStepIndex = parseInt(funnel.step.replace('step', ''), 10);
  const currentQuestion = ONBOARDING_QUESTIONS[currentStepIndex];
  const isLastStep = currentStepIndex === ONBOARDING_QUESTIONS.length - 1;

  const handleNext = (answer: string[]) => {
    const newAnswers = {
      ...funnel.context.answers,
      [currentQuestion.stepNumber]: answer,
    };

    console.log('Updated answers:', newAnswers);

    if (isLastStep) {
      console.log('Final answers:', newAnswers);
      const message = ONBOARDING_QUESTIONS.map(
        (q) => `${q.title}\n→ ${newAnswers[q.stepNumber]?.join(', ') ?? '없음'}`
      ).join('\n\n');

      if (window.confirm(`온보딩 완료!\n\n${message}\n\n메인 페이지로 이동할까요?`)) {
        navigate('/');
      }
    } else {
      funnel.history.push(`step${currentStepIndex + 1}`, () => ({
        answers: newAnswers,
      }));
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      funnel.history.push(`step${currentStepIndex - 1}`, (prev) => ({
        answers: prev.answers,
      }));
    }
  };

  return (
    <Layout header>
      <FunnelSection
        key={currentQuestion.stepNumber}
        question={currentQuestion}
        previousAnswer={funnel.context.answers[currentQuestion.stepNumber]}
        onNext={handleNext}
        onBack={currentStepIndex > 0 ? handleBack : undefined}
        progress={{
          current: currentStepIndex + 1,
          total: ONBOARDING_QUESTIONS.length,
        }}
      />
    </Layout>
  );
}
