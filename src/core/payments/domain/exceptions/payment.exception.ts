import { HttpException, HttpStatus } from '@nestjs/common';

export class PaymentNotFoundException extends HttpException {
  constructor(id: string) {
    super(`El pago con id '${id}' no fue encontrado`, HttpStatus.NOT_FOUND);
  }
}

export class PaymentAlreadyExistsException extends HttpException {
  constructor(id: string) {
    super(`El pago con id '${id}' ya existe`, HttpStatus.CONFLICT);
  }
}

export class PaymentBadRequestException extends HttpException {
  constructor(message: string) {
    super(`Solicitud incorrecta: ${message}`, HttpStatus.BAD_REQUEST);
  }
}

export class PaymentInternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(
      `Error interno del servidor: ${message}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
