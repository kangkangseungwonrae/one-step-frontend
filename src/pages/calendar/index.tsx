import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetCompleteTaskCount } from '@/api/queries/task/useGetCompleteTaskCount';
import Layout from '@/components/layout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import RecordList from './components/record-list';

export default function CalendarPage() {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(() => new Date());

  const currentDate = date ?? new Date();
  const displayMonth = month;

  const { data: completeTaskCount } = useGetCompleteTaskCount({
    from: dayjs(displayMonth).startOf('month').toISOString(),
    to: dayjs(displayMonth).endOf('month').toISOString(),
  });

  const getDayCount = (date: Date) => {
    if (!completeTaskCount?.calendar) return 0;
    const target = completeTaskCount.calendar.find((item) => dayjs(item.date).isSame(date, 'day'));
    return target?.count ?? 0;
  };

  const monthYearFormat = t('Calendar.monthYearFormat');
  const dayRecordDateFormat = t('Calendar.dayRecordDateFormat');

  // 선택한 날짜를 "로컬 자정 기준"으로 잘라 공통으로 사용
  const currentDay = dayjs(currentDate).startOf('day');
  // API 조회용: UTC ISO 문자열
  const isoDate = currentDay.toISOString();

  return (
    <Layout hasHeader hasNav>
      <main className="flex flex-col gap-4">
        <section className="flex flex-col justify-start">
          <span className="text-2xl font-bold">{t('Calendar.title')}</span>
          <div className="flex items-center gap-2">
            <span className="tabular-nums">{dayjs(displayMonth).format(monthYearFormat)}</span>
            <span className="tabular-nums">{t('Calendar.totalActions', { count: completeTaskCount?.total ?? 0 })}</span>
          </div>
        </section>
        <section>
          <Card>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                month={displayMonth}
                onMonthChange={setMonth}
                getDayCount={getDayCount}
              />
            </CardContent>
          </Card>
        </section>
        <section>
          <Card>
            <CardHeader>
              <CardTitle>
                <span>
                  {t('Calendar.dayRecordTitle', {
                    date: currentDay.format(dayRecordDateFormat),
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
