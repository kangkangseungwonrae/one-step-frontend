import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Layout from '@/components/layout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import RecordList from './components/record-list';

export default function CalendarPage() {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const monthYearFormat = t('Calendar.monthYearFormat');
  const dayRecordDateFormat = t('Calendar.dayRecordDateFormat');

  const isoDate = dayjs(date).utc().startOf('day').toISOString();

  return (
    <Layout hasHeader hasNav>
      <main className="flex flex-col gap-4">
        <section className="flex flex-col justify-start">
          <span className="text-2xl font-bold">{t('Calendar.title')}</span>
          <div className="flex items-center gap-2">
            <span>{dayjs(date).format(monthYearFormat)}</span>
            <span>{t('Calendar.totalActions', { count: 0 })}</span>
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
                <span>
                  {t('Calendar.dayRecordTitle', {
                    date: dayjs(date).format(dayRecordDateFormat),
                  })}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 overflow-auto h-fit max-h-[calc(114px*5)]">
              <RecordList date={isoDate} />
            </CardContent>
          </Card>
        </section>
        <section>
          <Card>
            <CardContent className="flex justify-center">
              <span>{t('Calendar.cheer')}</span>
            </CardContent>
          </Card>
        </section>
      </main>
    </Layout>
  );
}
