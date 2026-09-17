'use client';

import { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export function NavbarCalendar() {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();

  // Build calendar grid for the current view month
  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = lastDay.getDate();

    const days: (number | null)[] = [];
    // Leading blanks
    for (let i = 0; i < startWeekday; i++) days.push(null);
    // Days
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    // Trailing blanks to fill the last row
    while (days.length % 7 !== 0) days.push(null);

    return days;
  }, [viewDate]);

  const isToday = (day: number | null) => {
    if (!day) return false;
    return (
      day === today.getDate() &&
      viewDate.getMonth() === today.getMonth() &&
      viewDate.getFullYear() === today.getFullYear()
    );
  };

  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const goToday = () => {
    setViewDate(new Date());
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all"
          title="Lihat kalender"
        >
          <CalendarIcon className="h-4 w-4 text-amber-300" />
          <span className="hidden xl:inline">{format(today, 'd MMM yyyy', { locale: idLocale })}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 z-[60]"
        align="center"
        sideOffset={8}
      >
        {/* Calendar header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button
            onClick={prevMonth}
            className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Bulan sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="text-center">
            <p className="font-bold text-foreground text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
              {MONTHS[viewDate.getMonth()]}
            </p>
            <p className="text-xs text-muted-foreground">{viewDate.getFullYear()}</p>
          </div>
          <button
            onClick={nextMonth}
            className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Bulan berikutnya"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="p-3">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground uppercase">
                {d}
              </div>
            ))}
          </div>
          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => (
              <button
                key={i}
                disabled={!day}
                onClick={() => day && goToday()}
                className={cn(
                  'h-8 w-8 rounded-lg text-xs font-medium transition-all flex items-center justify-center',
                  !day && 'invisible',
                  day && !isToday(day) && 'text-foreground hover:bg-primary/10 hover:text-primary',
                  isToday(day) && 'bg-primary text-primary-foreground font-bold shadow-sm'
                )}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Footer with today's date */}
        <div className="flex items-center justify-between p-3 border-t border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">
              {format(today, 'EEEE, d MMMM yyyy', { locale: idLocale })}
            </span>
          </div>
          <button
            onClick={goToday}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Hari ini
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
