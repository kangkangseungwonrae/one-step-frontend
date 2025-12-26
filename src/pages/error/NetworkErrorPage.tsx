import { RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NetworkErrorPageProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export default function NetworkErrorPage({ resetErrorBoundary }: NetworkErrorPageProps) {
  const { t } = useTranslation();

  const handleRetry = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center border-destructive/20 shadow-lg">
        <CardContent className="flex flex-col items-center gap-6 pt-12 pb-8 px-6">
          <div className="text-8xl">🔌</div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-muted-foreground">Network Error</h1>
            <p className="text-lg font-semibold text-muted-foreground">{String(t('NetworkError.title'))}</p>
          </div>

          <div className="flex flex-col gap-3 w-full px-6">
            <Button className="w-full gap-2" onClick={handleRetry}>
              <RotateCcw className="h-4 w-4" />
              {String(t('NetworkError.retry'))}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
