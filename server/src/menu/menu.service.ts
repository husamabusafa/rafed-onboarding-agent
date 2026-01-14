import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getMenu() {
    return this.prisma.menuCategory.findMany({
      include: {
        items: {
          orderBy: { nameEn: 'asc' },
        },
      },
      orderBy: { nameEn: 'asc' },
    });
  }
}
