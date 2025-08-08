import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const exceptionResponse =
			exception instanceof HttpException
				? exception.getResponse()
				: exception;

		const message =
			typeof exceptionResponse === 'string'
				? exceptionResponse
				: exceptionResponse?.message || 'Error desconocido';

		response.status(status).json({
			code: status,
			success: false,
			message,
			values: {}
		});
	}
}
