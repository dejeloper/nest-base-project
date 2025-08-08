import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const ctx = context.switchToHttp();
		const response = ctx.getResponse();

		const statusCode = response.statusCode ?? 200;

		return next.handle().pipe(
			map((data) => ({
				code: statusCode,
				error: false,
				message: 'Consulta Exitosa',
				values: data,
			})),
		);
	}
}
