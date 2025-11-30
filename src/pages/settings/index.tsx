import { UserRound } from 'lucide-react';
import { useNavigate } from 'react-router';

import { api } from '@/api/axios';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import type { ElementType, ReactNode } from 'react';

function SettingsSection({ title, icon, children }: { title: string; icon: ElementType; children: ReactNode }) {
  const Icon = icon;
  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md mb-4">
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

  const handleLogout = () => {
    // TODO: API 모듈화
    api
      .post('/auth/logout')
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div>
      <SettingsSection title="Profile" icon={UserRound}>
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
      <span role="presentation" className="text-sm text-red-500 cursor-pointer" onClick={handleLogout}>
        로그아웃
      </span>
    </div>
  );
}
