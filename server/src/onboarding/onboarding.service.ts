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

    if (!employee) {
      return null;
    }

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

    if (!employee || !employee.probationStart || !employee.probationEnd) {
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
      nextEvaluationDate: evaluations.find(e => !e.completedDate)?.scheduledDate?.toISOString().split('T')[0],
    };
  }

  async getFeedbackSurveys(employeeId: number) {
    return this.prisma.feedbackSurvey.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOnboardingPlan(employeeId: number) {
    return this.prisma.onboardingPlan.findUnique({
      where: { employeeId },
      include: {
        template: true,
        tasks: {
          orderBy: [{ stage: 'asc' }, { priority: 'desc' }],
          include: {
            dependencies: true,
            blockedBy: true,
          },
        },
      },
    });
  }

  async getPolicyAcknowledgments(employeeId: number) {
    return this.prisma.policyAcknowledgment.findMany({
      where: { employeeId },
      orderBy: { requiredBy: 'asc' },
    });
  }

  async getTrainingModules(employeeId: number) {
    return this.prisma.trainingModule.findMany({
      orderBy: { required: 'desc' },
      include: {
        completions: {
          where: { employeeId },
        },
      },
    });
  }

  async getCheckIns(employeeId: number) {
    return this.prisma.checkIn.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createCheckIn(employeeId: number, data: any) {
    const checkIn = await this.prisma.checkIn.create({
      data: {
        employeeId,
        checkInType: data.checkInType,
        conductedBy: data.conductedBy,
        notes: data.notes,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
        completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
      },
    });

    await this.prisma.onboardingEvent.create({
      data: {
        employeeId,
        eventType: 'CHECK_IN_COMPLETED',
        payload: { checkInId: checkIn.id, checkInType: checkIn.checkInType },
      },
    });

    return checkIn;
  }

  async getOnboardingEvents(employeeId: number) {
    return this.prisma.onboardingEvent.findMany({
      where: { employeeId },
      orderBy: { occurredAt: 'desc' },
    });
  }

  async submitFeedback(employeeId: number, data: any) {
    return this.prisma.feedbackSurvey.create({
      data: {
        employeeId,
        surveyType: data.surveyType,
        onboardingStage: data.onboardingStage,
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
