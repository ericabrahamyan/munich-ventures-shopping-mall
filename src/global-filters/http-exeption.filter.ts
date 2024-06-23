import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.message;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as any;
      if (Array.isArray(errorResponse)) {
        message = errorResponse[0];
      } else if (Array.isArray(errorResponse.message)) {
        message = errorResponse.message[0];
      } else {
        message = errorResponse.message || message;
      }
    } else if (exception instanceof QueryFailedError) {
      // Handle database errors such as unique constraint violations
      if (
        exception.message.includes(
          'duplicate key value violates unique constraint',
        )
      ) {
        message = 'Duplicate value detected. Please use a unique value.';
        status = HttpStatus.CONFLICT;
      } else {
        message = 'Database error';
      }
    }

    this.logger.error(`Exception: ${message}, status: ${status}`);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
