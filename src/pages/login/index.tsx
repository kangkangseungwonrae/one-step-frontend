import GoogleIcon from '@/assets/icons/google.svg?react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/auth/google/callback';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="flex items-center text-center gap-6 w-full max-w-md">
        <CardHeader className="pt-2 pb-0 w-full">
          <CardTitle className="text-3xl font-black tracking-tight text-card-foreground">One Step</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">하루에 단 하나만, 지금 할 수 있는 것부터 시작해봐요.</p>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center gap-6 pt-2 px-6">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <GoogleIcon />
            <span className="font-medium">구글 계정으로 시작하기</span>
          </Button>
          <div className="flex flex-col items-center *:text-xs *:text-muted-foreground">
            <p>구글 로그인 버튼을 누르면 서비스 이용 약관과</p>
            <p>개인정보 처리방침에 동의하는 것으로 간주됩니다.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
