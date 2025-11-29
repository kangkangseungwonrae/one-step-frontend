import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CheckboxGroup, CheckboxGroupItem } from '@/components/ui/radio-group';

type Step1Props = {
  previousAnswers?: {
    question1?: string[];
  };
  onNext: (answer: string[]) => void;
};

export default function Step1({ previousAnswers, onNext }: Step1Props) {
  const [selected, setSelected] = useState<string[]>(previousAnswers?.question1 || []);

  return (
    <div className="h-full w-full max-w-sm mx-auto flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-6">Step1</h2>

      <CheckboxGroup value={selected} onValueChange={setSelected}>
        <CheckboxGroupItem value="none">없음</CheckboxGroupItem>
        <CheckboxGroupItem value="dog">강아지</CheckboxGroupItem>
        <CheckboxGroupItem value="cat">고양이</CheckboxGroupItem>
        <CheckboxGroupItem value="other">기타</CheckboxGroupItem>
      </CheckboxGroup>

      <Button variant="default" onClick={() => onNext(selected)} disabled={selected.length === 0} className="mt-6">
        다음
      </Button>
    </div>
  );
}
