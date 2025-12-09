import { useGetProfile } from '@/api/queries/profile';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  logoText?: string;
  profileImage?: string;
  profileName?: string;
}

export function Header({ profileName = 'User' }: HeaderProps) {
  const { data: profile } = useGetProfile();

  const displayName = (profile?.name && profile.name.trim()) || (profileName && profileName.trim()) || 'User';
  const fallbackInitial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50">
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
