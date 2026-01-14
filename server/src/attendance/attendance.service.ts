import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async getAttendance(employeeId: number, date?: string) {
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    const todayAttendance = await this.prisma.attendanceRecord.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date: targetDate,
        },
      },
    });

    const recentHistory = await this.prisma.attendanceRecord.findMany({
      where: { employeeId },
      orderBy: { date: 'desc' },
      take: 7,
    });

    return {
      employeeId,
      date: targetDate.toISOString().split('T')[0],
      checkInTime: todayAttendance?.checkInTime?.toISOString(),
      checkOutTime: todayAttendance?.checkOutTime?.toISOString(),
      status: todayAttendance?.status || 'ABSENT',
      location: todayAttendance?.location,
      biometricVerified: todayAttendance?.biometricVerified || false,
      recentHistory: recentHistory.map(record => ({
        date: record.date.toISOString().split('T')[0],
        checkIn: record.checkInTime?.toTimeString().slice(0, 5),
        checkOut: record.checkOutTime?.toTimeString().slice(0, 5),
        hoursWorked: record.hoursWorked || 0,
        status: record.status,
      })),
    };
  }

  async checkIn(employeeId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.prisma.attendanceRecord.upsert({
      where: {
        employeeId_date: {
          employeeId,
          date: today,
        },
      },
      update: {
        checkInTime: new Date(),
        status: 'PRESENT',
        biometricVerified: true,
      },
      create: {
        employeeId,
        date: today,
        checkInTime: new Date(),
        status: 'PRESENT',
        biometricVerified: true,
      },
    });
  }

  async checkOut(employeeId: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const record = await this.prisma.attendanceRecord.findUnique({
      where: {
        employeeId_date: {
          employeeId,
          date: today,
        },
      },
    });

    if (!record || !record.checkInTime) {
      throw new Error('No check-in record found for today');
    }

    const checkOutTime = new Date();
    const hoursWorked = (checkOutTime.getTime() - record.checkInTime.getTime()) / (1000 * 60 * 60);

    return this.prisma.attendanceRecord.update({
      where: {
        employeeId_date: {
          employeeId,
          date: today,
        },
      },
      data: {
        checkOutTime,
        hoursWorked: Math.round(hoursWorked * 10) / 10,
      },
    });
  }
}
