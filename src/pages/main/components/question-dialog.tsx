import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import useFunnelStore from '../stores/useFunnelStore';
import { useGetProfile } from '@/api/queries/profile';
import { useGetFollowingQuestion } from '@/api/queries/task/useGetFollowingQuestion';
import { usePostCompleteTasks } from '@/api/queries/task/usePostCompleteTasks';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type QuestionDialogProps = {
  open?: boolean;
  onClose?: () => void;
};

export default function QuestionDialog({ open, onClose }: QuestionDialogProps) {
  const { t } = useTranslation();
  const selectedTask = useFunnelStore((state) => state.selectedTask);
  const selectedMood = useFunnelStore((state) => state.selectedMood);
  const { data: profile } = useGetProfile();

  const { mutate: postCompleteTask } = usePostCompleteTasks();
  const { data: followingQuestion } = useGetFollowingQuestion({ categories: ['정신 건강', '회복탄력성'] });
  if (!selectedTask || !selectedTask.id) {
    return null;
  }

  const handlePostCompleteTask = () => {
    console.log(selectedMood); // 어떻게든 쓰일 mood
    console.log(followingQuestion);

    const requestBody = {
      taskId: selectedTask.id,
      completedAt: dayjs().utc().toISOString(),
      duration: 0, // ! 이거 바꿔야 함!!@
    };

    postCompleteTask(requestBody);
    onClose?.();
  };

  // post complete task
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground">
        <div className="flex flex-col items-center gap-4 p-5">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-3xl">💬</span>
            <span className="text-lg font-semibold">{t('QuestionDialog.title')}</span>
            <span className="text-xs text-neutral-500">{t('QuestionDialog.subTitle', { name: profile?.name })}</span>
          </div>

          <RadioGroup className="w-full flex flex-col gap-2">
            <RadioGroupItem value="option1">option1</RadioGroupItem>
            <RadioGroupItem value="option2">option2</RadioGroupItem>
            <RadioGroupItem value="option3">option3</RadioGroupItem>
            <RadioGroupItem value="option4">option4</RadioGroupItem>
            <RadioGroupItem value="option5">option5</RadioGroupItem>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button onClick={handlePostCompleteTask}>{t('QuestionDialog.goToMain')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
