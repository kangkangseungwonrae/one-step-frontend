import { RadioGroup } from '@radix-ui/react-radio-group';
import { UserRound, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { logout } from '@/api/services';
import Layout from '@/components/layout';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { RadioGroupItem } from '@/components/ui/radio-group';

import type { ElementType, ReactNode } from 'react';

function SettingsSection({ title, icon, children }: { title: string; icon: ElementType; children: ReactNode }) {
  const Icon = icon;
  return (
    <div className="flex flex-col gap-4 border p-4 rounded-md mb-4">
      <div className="flex gap-2 items-center">
        <Icon className="w-4 h-4" />
        <p className="text-md font-semibold">{title}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function Settings() {
  const profileImage = '/user-profile-illustration.png';
  const profileName = 'User';

  const navigate = useNavigate();
  const { t, i18n } = useTranslation('settings');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Layout header nav>
      <SettingsSection title={t('profile')} icon={UserRound}>
        <div className="flex gap-4 items-center">
          <Avatar className="h-10 w-10 hover:opacity-80 transition-opacity">
            <AvatarImage src={profileImage || '/placeholder.svg'} alt={profileName} />
            <AvatarFallback>{profileName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="">name</p>
            <p className="text-sm text-neutral-600">email</p>
          </div>
        </div>
      </SettingsSection>
      <SettingsSection title={t('language')} icon={Languages}>
        <RadioGroup className="flex flex-col gap-2 *:py-2" defaultValue="ko-KR" onValueChange={handleChangeLanguage}>
          <RadioGroupItem value="ko-KR">{t('languages.korean')}</RadioGroupItem>
          <RadioGroupItem value="en-US">{t('languages.english')}</RadioGroupItem>
        </RadioGroup>
      </SettingsSection>
      <button type="button" onClick={handleLogout}>
        <p className="text-md text-red-500">{t('logout')}</p>
      </button>
    </Layout>
  );
}
