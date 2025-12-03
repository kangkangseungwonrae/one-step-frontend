import { useEffect } from 'react';

import { useGetProfile } from '@/api/profile/queries';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import i18n from '@/lib/i18n';

interface HeaderProps {
  logoText?: string;
  profileImage?: string;
  profileName?: string;
}

export function Header({ profileImage = '/user-profile-illustration.png', profileName = 'User' }: HeaderProps) {
  const { data: profile, isLoading, error } = useGetProfile();

  useEffect(() => {
    if (profile?.locale) {
      i18n.changeLanguage(profile.locale);
    }
  }, [profile?.locale]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-[640px] mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="font-bold text-lg text-foreground">{profile?.locale}</div>

        {/* Right: Profile Avatar */}
        <Avatar className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity">
          <AvatarImage src={profileImage || '/placeholder.svg'} alt={profileName} />
          <AvatarFallback>{profileName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
