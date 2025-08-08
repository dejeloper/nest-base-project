
import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()
export class AppService {
  private prisma = new PrismaClient();

  async getHello(): Promise<string> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return 'La API está funcionando correctamente';
    } catch (error) {
      throw new InternalServerErrorException('No se pudo completar la operación. Contacte al administrador del sistema.');
    }
  }
}
