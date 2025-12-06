import { useEffect } from 'react';

import { useGetProfile } from '@/api/profile/queries';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import i18n from '@/lib/i18n';

interface HeaderProps {
  logoText?: string;
  profileImage?: string;
  profileName?: string;
}

export function Header({ profileName = 'User' }: HeaderProps) {
  const { data: profile } = useGetProfile();

  const displayName = (profile?.name && profile.name.trim()) || (profileName && profileName.trim()) || 'User';
  const fallbackInitial = displayName.charAt(0).toUpperCase();

  // ? 이걸 여기에 넣는게 맞는걸까
  useEffect(() => {
    if (profile?.locale) {
      i18n.changeLanguage(profile.locale);
    }
  }, [profile?.locale]);

  return (
    <header className="border-b border-border sticky top-0 z-50">
      <div className="max-w-[640px] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-black text-lg text-foreground">One Step</div>
        <Avatar className="h-10 w-10 hover:opacity-80 transition-opacity">
          <AvatarImage src={profile?.image || '/default-avatar.svg'} alt={displayName} />
          <AvatarFallback>{fallbackInitial}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
