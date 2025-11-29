import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CheckboxGroup, CheckboxGroupItem } from '@/components/ui/radio-group';

type Step2Props = {
  previousAnswers: {
    question1: string[];
    question2?: string[];
  };
  onNext: (answer: string[]) => void;
  onBack?: () => void;
};

export default function Step2({ previousAnswers, onNext, onBack }: Step2Props) {
  const [selected, setSelected] = useState<string[]>(previousAnswers.question2 || []);

  return (
    <div className="h-full w-full max-w-sm mx-auto flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-6">Step2</h2>

      <CheckboxGroup value={selected} onValueChange={setSelected}>
        <CheckboxGroupItem value="none">없음</CheckboxGroupItem>
        <CheckboxGroupItem value="dog">강아지</CheckboxGroupItem>
        <CheckboxGroupItem value="cat">고양이</CheckboxGroupItem>
        <CheckboxGroupItem value="other">기타</CheckboxGroupItem>
      </CheckboxGroup>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          이전
        </Button>
        <Button disabled={selected.length === 0} onClick={() => onNext(selected)}>
          다음
        </Button>
      </div>
    </div>
  );
}
