import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useGetProfile } from '@/api/queries/profile';
import { useGetFollowingQuestion } from '@/api/queries/task/useGetFollowingQuestion';
import { usePostFollowingQuestion } from '@/api/queries/task/usePostFollowingQuestion';
import { Button } from '@/components/ui/button';
import { CheckboxGroup, CheckboxGroupItem } from '@/components/ui/checkbox-group';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';

type QuestionDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function QuestionDialog({ isOpen, setIsOpen }: QuestionDialogProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: profile } = useGetProfile();
  // TODO: 카테고리 어떤 걸 가져와야 하는지?
  const { data: followingQuestion } = useGetFollowingQuestion({ categories: ['정신 건강', '회복탄력성'] });
  const { mutate: postFollowingQuestion } = usePostFollowingQuestion();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handlePostCompleteTask = () => {
    if (!followingQuestion) return;

    postFollowingQuestion(
      {
        followingQuestionId: followingQuestion.id,
        keywordIds: selectedIds.map(Number),
        completedAt: dayjs().toISOString(),
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          navigate('/', { replace: true });
        },
      }
    );
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // 답변 없이 닫으면 그냥 메인으로
      navigate('/');
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-md bg-card text-card-foreground">
        <div className="flex flex-col items-center gap-4 p-5">
          <div className="flex flex-col items-center justify-center gap-1">
            <span className="text-3xl">💬</span>
            <span className="text-lg font-semibold">{t('QuestionDialog.title')}</span>
            <span className="text-xs text-neutral-500">{t('QuestionDialog.subTitle', { name: profile?.name })}</span>
          </div>

          <span className="text-center font-medium">{followingQuestion?.question}</span>

          {/* 분리한 CheckboxGroup 사용 */}
          <CheckboxGroup className="w-full" value={selectedIds} onValueChange={setSelectedIds}>
            {followingQuestion?.keywords.map((keyword) => (
              <CheckboxGroupItem key={keyword.name} value={keyword.id.toString()}>
                {keyword.name}
              </CheckboxGroupItem>
            ))}
          </CheckboxGroup>
        </div>

        <DialogFooter className="px-5">
          <Button className="w-full" onClick={handlePostCompleteTask} disabled={selectedIds.length === 0}>
            {t('QuestionDialog.confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
