import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeesModule } from './employees/employees.module';
import { MenuModule } from './menu/menu.module';
import { CalendarModule } from './calendar/calendar.module';
import { AttendanceModule } from './attendance/attendance.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    EmployeesModule,
    MenuModule,
    CalendarModule,
    AttendanceModule,
    OnboardingModule,
    RequestsModule,
  ],
})
export class AppModule {}
