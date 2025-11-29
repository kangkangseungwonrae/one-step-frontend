import { Button } from '@/components/ui/button';

export default function Login() {
  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_CALLBACK_URL;
    console.log('Client ID:', clientId);
    console.log('Redirect URI:', redirectUri);

    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ');

    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scope)}` +
      `&access_type=offline` +
      `&prompt=consent`;

    window.location.href = googleAuthUrl;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <Button onClick={handleGoogleLogin}>구글 로그인</Button>
    </div>
  );
}
