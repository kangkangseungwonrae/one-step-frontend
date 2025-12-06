import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Layout from '@/components/layout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CalendarPage() {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Layout header nav>
      <main className="flex flex-col gap-4">
        <section className="flex flex-col justify-start">
          <span className="text-2xl font-bold">{t('calendar.title')}</span>
          <div className="flex items-center gap-2">
            <span>{dayjs(date).format('YYYY년 MM월')}</span>
            <span>{t('calendar.totalActions', { count: 0 })}</span>
          </div>
        </section>
        <section>
          <Card>
            <CardContent className="flex justify-center">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </CardContent>
          </Card>
        </section>
        <section>
          <Card>
            <CardHeader>
              <CardTitle>
                <span>{dayjs(date).format('MM월 DD일')}의 기록</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div></div>
            </CardContent>
          </Card>
        </section>
      </main>
    </Layout>
  );
}
