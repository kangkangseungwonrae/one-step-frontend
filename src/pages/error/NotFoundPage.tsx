import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="flex flex-col items-center gap-6 pt-12 pb-8 px-6">
          <div className="text-8xl">🤔</div>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-muted-foreground">404</h1>
            <p className="text-xl font-semibold text-muted-foreground">{t('NotFound.title')}</p>
          </div>

          <p className="text-sm text-muted-foreground">{t('NotFound.description')}</p>

          <div className="flex gap-3 w-full px-12">
            <Button variant="outline" className="flex-1" onClick={() => navigate(-1)}>
              {t('NotFound.goBack')}
            </Button>
            <Button className="flex-1" onClick={() => navigate('/')}>
              {t('NotFound.goHome')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
