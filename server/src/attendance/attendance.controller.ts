import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get(':employeeId')
  getAttendance(
    @Param('employeeId') employeeId: string,
    @Query('date') date?: string,
  ) {
    return this.attendanceService.getAttendance(+employeeId, date);
  }

  @Post(':employeeId/check-in')
  checkIn(@Param('employeeId') employeeId: string) {
    return this.attendanceService.checkIn(+employeeId);
  }

  @Post(':employeeId/check-out')
  checkOut(@Param('employeeId') employeeId: string) {
    return this.attendanceService.checkOut(+employeeId);
  }
}
