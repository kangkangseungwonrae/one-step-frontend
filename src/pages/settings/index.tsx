import { RadioGroup } from '@radix-ui/react-radio-group';
import { UserRound, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { useGetProfile, usePatchProfile } from '@/api/profile/queries';
import { logout } from '@/api/services';
import Layout from '@/components/layout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { RadioGroupItem } from '@/components/ui/radio-group';

import type { ElementType, ReactNode } from 'react';

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

export default function Settings() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { data: profile } = useGetProfile();
  const { mutate: patchProfile } = usePatchProfile();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleChangeLanguage = (lang: 'ko' | 'en') => {
    try {
      patchProfile({ locale: lang });
      i18n.changeLanguage(lang);
    } catch (error) {
      console.error('Language change failed:', error);
    }
  };

  if (!profile) {
    return <div>로딩중...</div>;
  }

  const { name, image } = profile;

  console.log('Current profile locale:', profile.locale);

  return (
    <Layout header nav>
      <SettingsSection title={t('Settings.profile')} icon={UserRound}>
        <div className="flex gap-4 items-center">
          <Avatar className="h-10 w-10 hover:opacity-80 transition-opacity">
            <AvatarImage src={image || '/placeholder.svg'} alt="profile" />
            <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="">{name}</p>
            <p className="text-sm text-neutral-600">email</p>
          </div>
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
      <button type="button" onClick={handleLogout}>
        <p className="text-md text-red-500">{t('Settings.logout')}</p>
      </button>
    </Layout>
  );
}
