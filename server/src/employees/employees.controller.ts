import { Controller, Get, Param, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  findAll(
    @Query('searchQuery') searchQuery?: string,
    @Query('department') department?: string,
    @Query('region') region?: string,
    @Query('division') division?: string,
  ) {
    return this.employeesService.findAll({ searchQuery, department, region, division });
  }

  @Get('departments')
  getDepartments() {
    return this.employeesService.getDepartments();
  }

  @Get('divisions')
  getDivisions() {
    return this.employeesService.getDivisions();
  }

  @Get('contacts')
  getInternalContacts(@Query('category') category?: string) {
    return this.employeesService.getInternalContacts(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Get(':id/team')
  getTeam(@Param('id') id: string) {
    return this.employeesService.getTeam(+id);
  }
}
