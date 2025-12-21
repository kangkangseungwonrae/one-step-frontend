import { useGetProfile } from '@/api/queries/profile';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const { data: profile } = useGetProfile();

  const displayName = profile.name;

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-[640px] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-black text-lg text-foreground">One Step</div>
        <Avatar className="h-10 w-10 hover:opacity-80">
          <AvatarImage src={profile.image} alt={displayName} loading="eager" />
        </Avatar>
      </div>
    </header>
  );
}
