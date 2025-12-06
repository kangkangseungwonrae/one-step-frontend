import { useFunnel } from '@use-funnel/react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { usePatchProfile } from '@/api/profile/queries';
import { Button } from '@/components/ui/button';
import { ONBOARDING_NONE_OPTION_KEY, ONBOARDING_QUESTIONS } from '@/const/onboarding-questions';

import type { FunnelSteps } from '..';

export default function FunnelSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutate: patchProfile } = usePatchProfile();

  const funnel = useFunnel<FunnelSteps>({
    id: 'onboarding',
    initial: {
      step: 'step0',
      context: { answers: {} },
    },
  });

  const questions = ONBOARDING_QUESTIONS;

  const currentStepIndex = parseInt(funnel.step.replace('step', ''), 10);
  const currentQuestion = questions[currentStepIndex];
  const isLastStep = currentStepIndex === questions.length - 1;
  const previousAnswer = funnel.context.answers[currentQuestion.stepNumber];

  const [selected, setSelected] = useState<string[]>(previousAnswer ?? []);

  const handleToggle = (option: string) => {
    if (currentQuestion.multiple) {
      if (option === ONBOARDING_NONE_OPTION_KEY) {
        setSelected((prev) => (prev.includes(ONBOARDING_NONE_OPTION_KEY) ? [] : [ONBOARDING_NONE_OPTION_KEY]));
        return;
      }
      // '없다'가 이미 선택된 상태에서는 다른 옵션 선택 불가
      if (selected.includes(ONBOARDING_NONE_OPTION_KEY)) {
        return;
      }
      setSelected((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
    } else {
      setSelected([option]);
    }
  };

  const handleNext = () => {
    const newAnswers = {
      ...funnel.context.answers,
      [currentQuestion.stepNumber]: selected,
    };

    if (isLastStep) {
      // 모든 스텝의 선택지를 합쳐서 키워드 추출
      const selected = Object.values(newAnswers)
        .flat()
        .filter((option) => option !== ONBOARDING_NONE_OPTION_KEY);

      // "Onboarding.q7.options.desk" -> "desk"
      const keywords = selected
        .map((option) => option.split('.')[3])
        .filter((keyword): keyword is string => Boolean(keyword));

      console.info(keywords);

      patchProfile(
        { onboarding: true },
        {
          onSuccess: () => {
            navigate('/');
          },
        }
      );
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

  // 스텝이 바뀌거나 저장된 답변이 바뀌면 선택값 동기화
  useEffect(() => {
    const prev = funnel.context.answers[currentQuestion.stepNumber] ?? [];
    setSelected(prev);
  }, [funnel.context.answers, currentQuestion.stepNumber]);

  const isDisabled = selected.length === 0;
  const isNoneSelected = currentQuestion.multiple && selected.includes(ONBOARDING_NONE_OPTION_KEY);

  return (
    <div className="max-w-md mx-auto h-full flex flex-col">
      {/* Progress Bar */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-2">
          {currentStepIndex + 1} / {questions.length}
        </p>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 h-full">
        <div className="flex flex-col gap-2 h-24 mb-6">
          <h2 className="text-2xl font-bold">{t(currentQuestion.title)}</h2>
          {currentQuestion.multiple && <p className="text-sm">{t('Onboarding.common.multiple')}</p>}
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              onClick={() => handleToggle(option)}
              disabled={currentQuestion.multiple && option !== ONBOARDING_NONE_OPTION_KEY && isNoneSelected}
              className={`w-full p-4 rounded-sm transition-all text-left bg-card text-card-foreground ${
                selected.includes(option)
                  ? 'bg-primary font-medium text-primary-foreground'
                  : 'outline-2 outline-muted-foreground hover:outline-primary/50 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {t(option)}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-2">
        {currentStepIndex > 0 && (
          <Button onClick={handleBack} className="flex-1 h-14 rounded-lg font-medium transition-colors">
            {t('Onboarding.common.prev')}
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={isDisabled}
          className="flex-1 h-14 py-3 bg-primary text-primary-foreground rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors font-medium"
        >
          {isLastStep ? t('Onboarding.common.done') : t('Onboarding.common.next')}
        </Button>
      </div>
    </div>
  );
}
