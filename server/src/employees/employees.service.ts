import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters?: { department?: string; region?: string; division?: string; searchQuery?: string }) {
    const where: any = {};
    
    if (filters?.searchQuery) {
      where.OR = [
        { nameEn: { contains: filters.searchQuery, mode: 'insensitive' } },
        { nameAr: { contains: filters.searchQuery } },
        { email: { contains: filters.searchQuery, mode: 'insensitive' } },
      ];
    }
    
    if (filters?.department) {
      where.department = { nameEn: { contains: filters.department, mode: 'insensitive' } };
    }
    
    if (filters?.region) {
      where.region = { code: filters.region };
    }
    
    if (filters?.division) {
      where.division = { nameEn: { contains: filters.division, mode: 'insensitive' } };
    }

    return this.prisma.employee.findMany({
      where,
      include: {
        department: true,
        division: true,
        region: true,
        manager: {
          select: {
            nameEn: true,
            nameAr: true,
            email: true,
          },
        },
      },
      orderBy: { empId: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
        division: true,
        region: true,
        manager: true,
        directReports: true,
      },
    });
  }

  async getDepartments() {
    return this.prisma.department.findMany({
      include: {
        division: true,
        region: true,
      },
      orderBy: { nameEn: 'asc' },
    });
  }

  async getDivisions() {
    return this.prisma.division.findMany({
      include: {
        departments: {
          include: {
            region: true,
          },
        },
      },
      orderBy: { nameEn: 'asc' },
    });
  }

  async getTeam(employeeId: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        manager: {
          select: {
            id: true,
            empId: true,
            nameAr: true,
            nameEn: true,
            positionEn: true,
            email: true,
            mobile: true,
          },
        },
        department: {
          include: {
            employees: {
              where: {
                id: { not: employeeId },
              },
              select: {
                id: true,
                empId: true,
                nameAr: true,
                nameEn: true,
                positionEn: true,
                email: true,
                joiningDate: true,
              },
            },
          },
        },
      },
    });

    return {
      newEmployeeId: employee.empId,
      department: employee.department.nameEn,
      directManager: employee.manager,
      teamMembers: employee.department.employees,
    };
  }

  async getInternalContacts(category?: string) {
    const where = category ? { category: category.toUpperCase() as any } : {};
    
    return this.prisma.internalContact.findMany({
      where,
      include: {
        department: true,
      },
      orderBy: { departmentEn: 'asc' },
    });
  }
}
