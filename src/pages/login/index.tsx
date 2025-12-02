import GoogleIcon from '@/assets/icons/google.svg?react';
import { Button } from '@/components/ui/button';

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/auth/google/callback';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <Button onClick={handleGoogleLogin} variant="outline">
        <GoogleIcon />
        <span>구글 로그인</span>
      </Button>
    </div>
  );
}
