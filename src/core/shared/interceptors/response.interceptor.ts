import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    const statusCode = response.statusCode ?? 200;

    return next.handle().pipe(
      map((data) => {
        const hasCustomMessage =
          data && typeof data === 'object' && 'message' in data;
        let message = hasCustomMessage ? data.message : 'Ok';

        if (
          data &&
          typeof data === 'object' &&
          Object.values(data).some(
            (value) => Array.isArray(value) && value.length === 0,
          ) &&
          !hasCustomMessage
        ) {
          message = 'No se encontraron registros';
        }

        const values =
          hasCustomMessage && Object.keys(data).length === 1 ? {} : data;

        return {
          code: statusCode,
          success: true,
          message,
          values,
        };
      }),
    );
  }
}
