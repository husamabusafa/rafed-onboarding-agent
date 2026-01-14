import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  // Document Requests
  @Get('documents/:employeeId')
  getDocumentRequests(@Param('employeeId') employeeId: string) {
    return this.requestsService.getDocumentRequests(+employeeId);
  }

  @Post('documents/:employeeId')
  createDocumentRequest(@Param('employeeId') employeeId: string, @Body() data: any) {
    return this.requestsService.createDocumentRequest(+employeeId, data);
  }

  // Leave Requests
  @Get('leave/:employeeId')
  getLeaveRequests(@Param('employeeId') employeeId: string) {
    return this.requestsService.getLeaveRequests(+employeeId);
  }

  @Post('leave/:employeeId')
  createLeaveRequest(@Param('employeeId') employeeId: string, @Body() data: any) {
    return this.requestsService.createLeaveRequest(+employeeId, data);
  }

  // Equipment Requests
  @Get('equipment/:employeeId')
  getEquipmentRequests(@Param('employeeId') employeeId: string) {
    return this.requestsService.getEquipmentRequests(+employeeId);
  }

  @Post('equipment/:employeeId')
  createEquipmentRequest(@Param('employeeId') employeeId: string, @Body() data: any) {
    return this.requestsService.createEquipmentRequest(+employeeId, data);
  }

  // Parking Requests
  @Get('parking/:employeeId')
  getParkingRequest(@Param('employeeId') employeeId: string) {
    return this.requestsService.getParkingRequest(+employeeId);
  }

  @Post('parking/:employeeId')
  createParkingRequest(@Param('employeeId') employeeId: string, @Body() data: any) {
    return this.requestsService.createParkingRequest(+employeeId, data);
  }

  // IT Access Requests
  @Get('it-access/:employeeId')
  getItAccessRequests(@Param('employeeId') employeeId: string) {
    return this.requestsService.getItAccessRequests(+employeeId);
  }

  @Post('it-access/:employeeId')
  createItAccessRequest(@Param('employeeId') employeeId: string, @Body() data: any) {
    return this.requestsService.createItAccessRequest(+employeeId, data);
  }
}
