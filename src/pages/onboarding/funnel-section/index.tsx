import { useEffect, useState } from 'react';

import type { Question } from '..';

type Props = {
  question: Question;
  previousAnswer?: string[];
  onNext: (answer: string[]) => void;
  onBack?: () => void;
  progress: {
    current: number;
    total: number;
  };
};

export default function FunnelSection({ question, previousAnswer = [], onNext, onBack, progress }: Props) {
  const [selected, setSelected] = useState<string[]>(previousAnswer);

  // 1) previousAnswer가 바뀌면 동기화
  // 2) question.stepNumber(=현재 스텝)이 바뀌면 이전 선택 초기화
  useEffect(() => {
    setSelected(previousAnswer ?? []);
  }, [previousAnswer, question.stepNumber]);

  const handleToggle = (option: string) => {
    if (question.multiple) {
      setSelected((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]));
    } else {
      setSelected([option]);
    }
  };

  const isDisabled = selected.length === 0;

  return (
    <div className="max-w-md mx-auto p-6 h-full flex flex-col">
      {/* Progress Bar */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-2">
          {progress.current} / {progress.total}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(progress.current / progress.total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1">
        <div className="flex flex-col gap-2 h-24 mb-6">
          <h2 className="text-2xl font-bold">{question.title}</h2>
          {question.multiple && <p className="text-sm text-gray-500">중복 선택 가능</p>}
        </div>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleToggle(option)}
              className={`bg-white w-full p-4 rounded-lg border-2 transition-all text-left ${
                selected.includes(option)
                  ? 'border-primary bg-blue-50 font-medium'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex-1 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            이전
          </button>
        )}
        <button
          onClick={() => onNext(selected)}
          disabled={isDisabled}
          className="flex-1 py-3 bg-secondary text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-secondary transition-colors font-medium"
        >
          {progress.current === progress.total ? '완료' : '다음'}
        </button>
      </div>
    </div>
  );
}
