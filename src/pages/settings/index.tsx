import { RadioGroup } from '@radix-ui/react-radio-group';
import { useQueryClient } from '@tanstack/react-query';
import { UserRound, Languages, Pencil } from 'lucide-react';
import { useState, type ElementType, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useGetProfile, useUpdateProfile } from '@/api/queries/profile';
import { logout } from '@/api/services';
import Layout from '@/components/layout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

import type { Profile } from '@/api/profile/dto';

function SettingsSection({ title, icon, children }: { title: string; icon: ElementType; children: ReactNode }) {
  const Icon = icon;
  return (
    <Card className="flex flex-col gap-4 p-4 rounded-md mb-4">
      <div className="flex gap-2 items-center">
        <Icon className="w-4 h-4" />
        <p className="text-md font-semibold">{title}</p>
      </div>
      <div>{children}</div>
    </Card>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const queryClient = useQueryClient();

  const { data } = useGetProfile();
  const profile = data as Profile;
  const { mutate: patchProfile } = useUpdateProfile();

  const [currentName, setCurrentName] = useState<string>(profile.name);
  const [userName, setUserName] = useState<string>(profile.name);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await logout();
      // 인증 상태 캐시 제거 -> 다음 진입 시 /auth 재조회
      queryClient.removeQueries({ queryKey: ['auth-status'] });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleOnboarding = () => {
    try {
      patchProfile({ onboarding: false });
    } catch (error) {
      console.error('Onboarding failed:', error);
    }
  };

  const handleChangeLanguage = (lang: string) => {
    try {
      patchProfile({ locale: lang });
      i18n.changeLanguage(lang);
    } catch (error) {
      console.error('Language change failed:', error);
    }
  };

  const { name, image } = profile;

  const handleEnterEditName = () => {
    setUserName(currentName);
    setIsEditingName(true);
    setNameError(null);
  };

  const handleCancelEditName = () => {
    setUserName(currentName);
    setIsEditingName(false);
    setNameError(null);
  };

  const handleSaveName = () => {
    const trimmed = userName.trim();

    if (!trimmed) {
      setNameError('닉네임은 빈 값일 수 없습니다.');
      return;
    }

    if (trimmed.length > 20) {
      setNameError('닉네임은 최대 20자까지 입력할 수 있습니다.');
      return;
    }

    patchProfile(
      { name: trimmed },
      {
        onSuccess: () => {
          setCurrentName(trimmed);
          setIsEditingName(false);
          setNameError(null);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          // 서버 응답 메시지에 따라 에러 문구 분기 처리
          const serverMessage = error?.response?.data?.message;

          if (serverMessage === 'Profile name already exists') {
            setNameError('이미 사용 중인 닉네임입니다.');
          } else {
            setNameError('닉네임 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
          }
        },
      }
    );
  };

  // 1. 문구와 색상을 결정하는 헬퍼 변수
  const isMaxLengthError = nameError === '닉네임은 최대 20자까지 입력할 수 있습니다.';
  // '20자 초과' 에러가 아니면서 다른 에러가 있는 경우
  const isOtherError = Boolean(nameError && !isMaxLengthError);

  return (
    <Layout hasHeader hasNav>
      <SettingsSection title={t('Settings.profile')} icon={UserRound}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center">
            <Avatar className="h-10 w-10 hover:opacity-80 transition-opacity">
              <AvatarImage src={image || '/placeholder.svg'} alt="profile" />
              <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col gap-1">
              <div className="relative w-full">
                <Input
                  value={userName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 20) {
                      setNameError('닉네임은 최대 20자까지 입력할 수 있습니다.');
                      return;
                    }
                    setNameError(null);
                    setUserName(value);
                  }}
                  className="w-full pr-9"
                  maxLength={21} // 20자에서 멈추지 않고 에러를 보여주려면 21로 설정하거나 로직 처리
                  readOnly={!isEditingName}
                />
                {!isEditingName && (
                  <button
                    type="button"
                    onClick={handleEnterEditName}
                    className="absolute inset-y-0 right-2 flex items-center text-card-foreground hover:text-primary"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 2. 조건부 문구 렌더링 영역 */}
              {isEditingName && (
                <p
                  className={cn(
                    'text-xs transition-colors',
                    // 20자 초과 에러거나 다른 에러가 있을 때 destructive 색상 적용
                    isMaxLengthError || isOtherError ? 'text-destructive' : 'text-muted-foreground'
                  )}
                >
                  {isOtherError ? nameError : '닉네임은 20자 이내로 입력할 수 있어요.'}
                </p>
              )}
            </div>
          </div>
          {isEditingName && (
            <div className="mt-1 flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={handleCancelEditName}>
                취소
              </Button>
              <Button type="button" size="sm" onClick={handleSaveName}>
                저장
              </Button>
            </div>
          )}
        </div>
      </SettingsSection>
      <SettingsSection title={t('Settings.language')} icon={Languages}>
        <RadioGroup
          className="flex flex-col gap-2 *:py-2"
          defaultValue={profile?.locale}
          onValueChange={handleChangeLanguage}
        >
          <RadioGroupItem value="ko">{t('Settings.korean')}</RadioGroupItem>
          <RadioGroupItem value="en">{t('Settings.english')}</RadioGroupItem>
        </RadioGroup>
      </SettingsSection>
      <div className="flex flex-col gap-2 *:text-start">
        <button type="button" onClick={handleLogout}>
          <p className="text-md">{t('Settings.logout')}</p>
        </button>
        <button type="button" onClick={handleOnboarding} className="cursor-pointer hover:underline">
          <p className="text-md text-start">온보딩 다시 시작하려면 여기 누르고 로그아웃 후 재로그인</p>
          <p className="text-md">나중에 삭제할 예정</p>
          <p className="text-md">onboarding: {profile.onboarding ? 'true' : 'false'}</p>
        </button>
      </div>
    </Layout>
  );
}
