import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';

interface CustomQueryFailedError extends QueryFailedError {
  detail?: string;
  table?: string;
  code?: string;
}

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(QueryErrorFilter.name);

  public catch(exception: QueryFailedError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const typedException = exception as CustomQueryFailedError;

    const errorDetail = typedException.detail || typedException.message || '';

    const tableName = (typedException.table || 'Record')
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    this.logger.error(
      `QueryFailedError caught for ${request.method} ${request.url}: ${exception.message}`,
      exception.stack,
    );
    if (typedException.code) {
      this.logger.error(`Database Error Code: ${typedException.code}`);
    }
    if (typedException.detail) {
      this.logger.error(`Database Error Detail: ${typedException.detail}`);
    }

    if (
      typedException.code === '23505' ||
      errorDetail.includes('already exists') ||
      errorDetail.includes('duplicate key') ||
      errorDetail.includes('UNIQUE constraint failed') // SQLite
    ) {
      let customMessage = `${tableName} com `;
      const match = errorDetail.match(/\(([^)]+)\)=\(([^)]+)\)/);
      if (match && match[1] && match[2]) {
        const columnName = match[1].split('_').join(' ');
        const value = match[2];
        customMessage += `${columnName} '${value}' já existe.`;
      } else {
        customMessage += `os dados fornecidos já existe.`;
      }

      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: customMessage,
        error: 'Conflict',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
    if (typedException.code === '23503') {
      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: `Cannot delete ${tableName} due to existing associations. Please remove associated records first.`,
        error: 'Conflict',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
    return super.catch(exception, host);
  }
}
