import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  // Document Requests
  async getDocumentRequests(employeeId: number) {
    return this.prisma.documentRequest.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createDocumentRequest(employeeId: number, data: any) {
    return this.prisma.documentRequest.create({
      data: {
        employeeId,
        documentType: data.documentType,
        purpose: data.purpose,
        deliveryMethod: data.deliveryMethod,
        urgency: data.urgency || 'NORMAL',
        additionalNotes: data.additionalNotes,
        status: 'SUBMITTED',
        submittedDate: new Date(),
      },
    });
  }

  // Leave Requests
  async getLeaveRequests(employeeId: number) {
    return this.prisma.leaveRequest.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createLeaveRequest(employeeId: number, data: any) {
    return this.prisma.leaveRequest.create({
      data: {
        employeeId,
        leaveType: data.leaveType,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        totalDays: data.totalDays,
        reason: data.reason,
        contactDuringLeave: data.contactDuringLeave,
        status: 'SUBMITTED',
      },
    });
  }

  // Equipment Requests
  async getEquipmentRequests(employeeId: number) {
    return this.prisma.equipmentRequest.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createEquipmentRequest(employeeId: number, data: any) {
    return this.prisma.equipmentRequest.create({
      data: {
        employeeId,
        equipmentType: data.equipmentType,
        quantity: data.quantity || 1,
        specifications: data.specifications,
        justification: data.justification,
        urgency: data.urgency || 'NORMAL',
        preferredDeliveryDate: data.preferredDeliveryDate ? new Date(data.preferredDeliveryDate) : null,
        status: 'SUBMITTED',
      },
    });
  }

  // Parking Requests
  async getParkingRequest(employeeId: number) {
    return this.prisma.parkingRequest.findUnique({
      where: { employeeId },
    });
  }

  async createParkingRequest(employeeId: number, data: any) {
    return this.prisma.parkingRequest.create({
      data: {
        employeeId,
        vehicleType: data.vehicleType,
        licensePlate: data.licensePlate,
        vehicleMake: data.vehicleMake,
        vehicleModel: data.vehicleModel,
        vehicleColor: data.vehicleColor,
        preferredLocation: data.preferredLocation,
        disabilityAccommodation: data.disabilityAccommodation || false,
        startDate: new Date(data.startDate),
        status: 'PENDING',
      },
    });
  }

  // IT Access Requests
  async getItAccessRequests(employeeId: number) {
    return this.prisma.itAccessRequest.findMany({
      where: { employeeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createItAccessRequest(employeeId: number, data: any) {
    return this.prisma.itAccessRequest.create({
      data: {
        employeeId,
        systems: data.systems,
        urgency: data.urgency || 'NORMAL',
        status: 'PENDING_MANAGER_APPROVAL',
      },
    });
  }
}
