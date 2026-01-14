import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CalendarService {
  constructor(private prisma: PrismaService) {}

  async getCalendar(year: number = 2026) {
    const holidays = await this.prisma.holiday.findMany({
      where: { year },
      orderBy: [{ month: 'asc' }, { date: 'asc' }],
    });

    // Group holidays by month
    const monthsMap = new Map();
    
    holidays.forEach((holiday) => {
      if (!monthsMap.has(holiday.month)) {
        monthsMap.set(holiday.month, {
          monthNumber: holiday.month,
          holidays: [],
        });
      }
      monthsMap.get(holiday.month).holidays.push(holiday);
    });

    const months = Array.from(monthsMap.values());

    return {
      year,
      weekendDays: ['Friday', 'Saturday'],
      months: months.map(month => ({
        ...month,
        nameEn: this.getMonthName(month.monthNumber),
        nameAr: this.getMonthNameAr(month.monthNumber),
        hijriRangeEn: 'Varies',
        hijriRangeAr: 'متغير',
        totalDays: this.getDaysInMonth(month.monthNumber, year),
        startsOn: this.getFirstDayOfMonth(month.monthNumber, year),
      })),
    };
  }

  private getMonthName(month: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month - 1];
  }

  private getMonthNameAr(month: number): string {
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                   'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    return months[month - 1];
  }

  private getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }

  private getFirstDayOfMonth(month: number, year: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(year, month - 1, 1).getDay()];
  }
}
