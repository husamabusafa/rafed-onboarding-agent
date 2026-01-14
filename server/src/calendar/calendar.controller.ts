import { Controller, Get, Query } from '@nestjs/common';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Get()
  getCalendar(@Query('year') year?: string) {
    return this.calendarService.getCalendar(year ? parseInt(year) : 2026);
  }
}
