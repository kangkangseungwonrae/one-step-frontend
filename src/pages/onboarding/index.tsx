import { useFunnel } from '@use-funnel/react-router';
import { useNavigate } from 'react-router';

import Step1 from './funnel-section/step1';
import Step2 from './funnel-section/step2';
import Step3 from './funnel-section/step3';

type FunnelSteps = {
  step1: {
    answers?: {
      question1?: string[];
    };
  };
  step2: {
    answers: {
      question1: string[]; // step1에서 넘어온 답변
      question2?: string[]; // 현재 질문의 답변
    };
  };
  step3: {
    answers: {
      question1: string[];
      question2: string[];
      question3?: string[]; // 현재 질문의 답변
    };
  };
};

export default function Onboarding() {
  const navigate = useNavigate();
  const funnel = useFunnel<FunnelSteps>({
    id: 'onboarding',
    initial: {
      step: 'step1',
      context: {},
    },
  });

  return (
    <div className="h-full w-full">
      <funnel.Render
        step1={({ history, context }) => (
          <Step1
            previousAnswers={context.answers}
            onNext={(answer) => {
              history.push('step2', {
                answers: {
                  question1: answer,
                },
              });
            }}
          />
        )}
        step2={({ history, context }) => (
          <Step2
            previousAnswers={context.answers}
            onNext={(answer) => {
              history.push('step3', {
                answers: {
                  ...context.answers,
                  question2: answer,
                },
              });
            }}
            onBack={() => {
              history.push('step1', {
                answers: context.answers,
              });
            }}
          />
        )}
        step3={({ history, context }) => (
          <Step3
            onNext={(answer) => {
              const finalAnswers = {
                ...context.answers,
                question3: answer,
              };

              const message = `
온보딩이 완료되었습니다!

질문1: ${finalAnswers.question1?.join(', ')}
질문2: ${finalAnswers.question2?.join(', ')}
질문3: ${finalAnswers.question3?.join(', ')}

메인 페이지로 이동하시겠습니까?
                `.trim();

              if (window.confirm(message)) {
                navigate('/');
              }
            }}
            onBack={() => {
              history.push('step2', {
                answers: context.answers,
              });
            }}
          />
        )}
      />
    </div>
  );
}
