import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OnboardingService {
  constructor(private prisma: PrismaService) {}

  async getTasks(employeeId: number) {
    const tasks = await this.prisma.onboardingTask.findMany({
      where: { employeeId },
      orderBy: { priority: 'desc' },
    });

    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      select: { onboardingStage: true },
    });

    const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
    const progressPercentage = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

    return {
      employeeId,
      onboardingStage: employee.onboardingStage,
      tasks,
      progressPercentage,
    };
  }

  async getIdBadgeStatus(employeeId: number) {
    return this.prisma.idBadge.findUnique({
      where: { employeeId },
    });
  }

  async getEmailSetupStatus(employeeId: number) {
    return this.prisma.emailSetup.findUnique({
      where: { employeeId },
    });
  }

  async getBuildingTours(employeeId: number) {
    return this.prisma.buildingTour.findMany({
      where: { employeeId },
      orderBy: { tourDate: 'desc' },
    });
  }

  async getOrientationWorkshops() {
    return this.prisma.orientationWorkshop.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  async getBenefits(employeeId: number) {
    return this.prisma.benefits.findUnique({
      where: { employeeId },
    });
  }

  async getProbationStatus(employeeId: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      select: {
        probationStart: true,
        probationEnd: true,
        empId: true,
      },
    });

    if (!employee.probationStart || !employee.probationEnd) {
      return null;
    }

    const today = new Date();
    const totalDays = Math.ceil(
      (employee.probationEnd.getTime() - employee.probationStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    const currentDay = Math.ceil(
      (today.getTime() - employee.probationStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    const progressPercentage = Math.min(Math.round((currentDay / totalDays) * 100), 100);

    const evaluations = await this.prisma.probationEvaluation.findMany({
      where: { employeeId },
      orderBy: { scheduledDate: 'asc' },
    });

    const milestones = await this.prisma.probationMilestone.findMany({
      where: { employeeId },
      orderBy: { dueDate: 'asc' },
    });

    return {
      employeeId: employee.empId,
      startDate: employee.probationStart.toISOString().split('T')[0],
      endDate: employee.probationEnd.toISOString().split('T')[0],
      duration: totalDays,
      currentDay,
      progressPercentage,
      status: today > employee.probationEnd ? 'COMPLETED' : 'ACTIVE',
      milestones,
      evaluations,
      nextEvaluationDate: evaluations.find(e => !e.completedDate)?.scheduledDate.toISOString().split('T')[0],
    };
  }

  async getFeedbackSurveys(employeeId: number) {
    return this.prisma.feedbackSurvey.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async submitFeedback(employeeId: number, data: any) {
    return this.prisma.feedbackSurvey.create({
      data: {
        employeeId,
        surveyType: data.surveyType,
        isAnonymous: data.isAnonymous || false,
        questions: data.questions,
        overallRating: data.overallRating,
        additionalComments: data.additionalComments,
        status: 'SUBMITTED',
        submittedDate: new Date(),
      },
    });
  }
}
