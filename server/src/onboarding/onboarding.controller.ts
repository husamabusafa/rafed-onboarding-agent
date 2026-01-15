import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @Get('tasks/:employeeId')
  getTasks(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getTasks(+employeeId);
  }

  @Get('id-badge/:employeeId')
  getIdBadgeStatus(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getIdBadgeStatus(+employeeId);
  }

  @Get('email-setup/:employeeId')
  getEmailSetupStatus(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getEmailSetupStatus(+employeeId);
  }

  @Get('building-tours/:employeeId')
  getBuildingTours(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getBuildingTours(+employeeId);
  }

  @Get('workshops')
  getOrientationWorkshops() {
    return this.onboardingService.getOrientationWorkshops();
  }

  @Get('benefits/:employeeId')
  getBenefits(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getBenefits(+employeeId);
  }

  @Get('probation/:employeeId')
  getProbationStatus(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getProbationStatus(+employeeId);
  }

  @Get('feedback/:employeeId')
  getFeedbackSurveys(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getFeedbackSurveys(+employeeId);
  }

  @Post('feedback/:employeeId')
  submitFeedback(@Param('employeeId') employeeId: string, @Body() data: any) {
    return this.onboardingService.submitFeedback(+employeeId, data);
  }

  @Get('plan/:employeeId')
  getOnboardingPlan(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getOnboardingPlan(+employeeId);
  }

  @Get('policies/:employeeId')
  getPolicyAcknowledgments(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getPolicyAcknowledgments(+employeeId);
  }

  @Get('training/:employeeId')
  getTrainingModules(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getTrainingModules(+employeeId);
  }

  @Get('checkins/:employeeId')
  getCheckIns(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getCheckIns(+employeeId);
  }

  @Post('checkins/:employeeId')
  createCheckIn(@Param('employeeId') employeeId: string, @Body() data: any) {
    return this.onboardingService.createCheckIn(+employeeId, data);
  }

  @Get('events/:employeeId')
  getOnboardingEvents(@Param('employeeId') employeeId: string) {
    return this.onboardingService.getOnboardingEvents(+employeeId);
  }
}
