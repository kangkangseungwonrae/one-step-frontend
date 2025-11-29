import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type MoodSelectorProps = {
  onNext: (selectedMood: string) => void;
};

export default function MoodSelector({ onNext }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string>('');

  const handleMoodSelect = () => {
    if (selectedMood) {
      if (window.confirm(`선택한 기분은 "${selectedMood}" 입니다. 다음으로 진행할까요?`)) {
        onNext(selectedMood);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center gap-4 p-5">
          <span>지금 기분은 어느 쪽에 가까운가요?</span>
          <RadioGroup value={selectedMood} onValueChange={setSelectedMood} className="w-full flex flex-col gap-2">
            <RadioGroupItem value="happy">😊 happy</RadioGroupItem>
            <RadioGroupItem value="neutral">😐 neutral</RadioGroupItem>
            <RadioGroupItem value="sad">😢 sad</RadioGroupItem>
          </RadioGroup>
        </div>
        <DialogFooter className="flex *:flex-1">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleMoodSelect}>
            다음
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
