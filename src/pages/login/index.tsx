import { useTranslation } from 'react-i18next';

import GoogleIcon from '@/assets/icons/google.svg?react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const { t } = useTranslation();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/auth/google/callback';
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-12">
      <Card className="flex items-center text-center gap-6 w-full max-w-md -mt-20">
        <CardHeader className="pt-2 pb-0 w-full">
          <CardTitle className="text-3xl font-black tracking-tight text-card-foreground">{t('Login.title')}</CardTitle>
          <div className="*:text-sm *:text-muted-foreground">
            <p>{t('Login.subtitle1')}</p>
            <p>{t('Login.subtitle2')}</p>
          </div>
        </CardHeader>
        <CardContent className="w-full flex flex-col items-center gap-6 pt-2 px-6">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <GoogleIcon />
            <span className="font-medium">{t('Login.googleLogin')}</span>
          </Button>
          <div className="flex flex-col items-center *:text-xs *:text-muted-foreground">
            <p>{t('Login.terms1')}</p>
            <p>{t('Login.terms2')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
