import { useFunnel } from '@use-funnel/react-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpdateProfile } from '@/api/queries/profile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ONBOARDING_NONE_OPTION_KEY, ONBOARDING_QUESTIONS } from '@/const/onboarding-questions';

import type { Answers, FunnelSteps } from '..';

export default function FunnelSection() {
  const { t, i18n } = useTranslation();
  const { mutate: patchProfile } = useUpdateProfile();

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

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(previousAnswer ?? []);

  const handleToggle = (option: string) => {
    if (currentQuestion.multiple) {
      if (option === ONBOARDING_NONE_OPTION_KEY) {
        setSelectedKeywords((prev) => (prev.includes(ONBOARDING_NONE_OPTION_KEY) ? [] : [ONBOARDING_NONE_OPTION_KEY]));
        return;
      }
      // '없다'가 이미 선택된 상태에서는 다른 옵션 선택 불가
      if (selectedKeywords.includes(ONBOARDING_NONE_OPTION_KEY)) {
        return;
      }
      setSelectedKeywords((prev) =>
        prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
      );
    } else {
      setSelectedKeywords([option]);
    }
  };

  const handleNext = () => {
    const newAnswers: Answers = {
      ...funnel.context.answers,
      [currentQuestion.stepNumber]: selectedKeywords,
    };

    if (isLastStep) {
      const categoriesSet = new Set<string>();
      const keywordsSet = new Set<string>();

      (Object.entries(newAnswers) as [string, string[]][]).forEach(([stepNumberStr, options]) => {
        const stepNumber = Number(stepNumberStr);
        const question = questions.find((q) => q.stepNumber === stepNumber);

        if (!question) {
          return;
        }

        // '없다'를 선택한 질문은 카테고리/키워드 모두 제외
        if (options.includes(ONBOARDING_NONE_OPTION_KEY)) {
          return;
        }

        // 하나라도 선택된 옵션이 있으면 해당 질문의 카테고리 추가 (중복은 Set으로 제거)
        if (options.length > 0) {
          const category = i18n.language === 'ko' ? question.category.ko : question.category.en;
          categoriesSet.add(category.trim());
        }

        // 질문이 multiple이 아닌 경우 (single choice)는 keyword 추가하지 않고 category만 유지
        if (!question.multiple) {
          return;
        }

        options.forEach((option) => {
          if (option === ONBOARDING_NONE_OPTION_KEY) {
            return;
          }

          const segments = option.split('.');
          const lastSegment = segments[segments.length - 1];

          // '기타(Etc)'는 키워드로 저장하지 않고 카테고리만 유지
          if (lastSegment === 'Etc') {
            return;
          }

          const localizedValue = t(option);

          if (localizedValue) {
            keywordsSet.add(localizedValue);
          }
        });
      });

      const categories = Array.from(categoriesSet);
      const keywords = Array.from(keywordsSet);

      console.info({ categories, keywords });

      patchProfile(
        {
          onboarding: true,
          categories: Array.from(categoriesSet).map((name) => ({ name })),
          keywords: Array.from(keywordsSet).map((name) => ({ name })),
        }
        // {
        //   onSuccess: () => {
        //     navigate('/');
        //   },
        // }
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
    setSelectedKeywords(prev);
  }, [funnel.context.answers, currentQuestion.stepNumber]);

  const isDisabled = selectedKeywords.length === 0;
  const isNoneSelected = currentQuestion.multiple && selectedKeywords.includes(ONBOARDING_NONE_OPTION_KEY);

  return (
    <div className="max-w-md mx-auto h-full flex flex-col relative">
      {/* Progress Bar */}
      <Card>
        <CardContent className="px-6">
          <div className="mb-4">
            <p className="text-sm text-mute-foreground mb-2">
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
                  className={`w-full p-4 rounded-sm transition-all text-left cursor-pointer ${
                    selectedKeywords.includes(option)
                      ? 'bg-primary font-medium text-primary-foreground'
                      : 'outline-2 outline-muted hover:outline-primary/50 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {t(option)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 w-full flex gap-2">
        {currentStepIndex > 0 && (
          <Button onClick={handleBack} className="flex-1 h-14 w-full rounded-lg font-medium transition-colors">
            {t('Onboarding.common.prev')}
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={isDisabled}
          className="flex-1 h-14 w-full py-3 bg-primary text-primary-foreground rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors font-medium"
        >
          {isLastStep ? t('Onboarding.common.done') : t('Onboarding.common.next')}
        </Button>
      </div>
    </div>
  );
}
