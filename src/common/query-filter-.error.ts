import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express'; // Import Response from express

interface CustomQueryFailedError extends QueryFailedError {
  detail?: string;
  table?: string;
}

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  public catch(exception: QueryFailedError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); // Get the response object

    const typedException = exception as CustomQueryFailedError;

    const errorDetail = typedException.detail || typedException.message || '';

    const tableName = (typedException.table || 'Record').split('_').join(' ');

    if (
      errorDetail.includes('already exists') ||
      errorDetail.includes('duplicate key') ||
      errorDetail.includes('UNIQUE constraint failed')
    ) {
      let customMessage = `${tableName} com `;

      const match = errorDetail.match(/\(([^)]+)\)=\(([^)]+)\)/);
      if (match && match[1] && match[2]) {
        customMessage += `${match[1].split('_').join(' ')} ${match[2]} já existe.`;
      } else {
        customMessage += `os dados fornecidos já existe.`;
      }

      // Directly send the response instead of throwing a new exception
      return response.status(409).json({
        statusCode: 409,
        message: customMessage,
        error: 'Conflict',
      });
    }

    // For other QueryFailedErrors, let the base filter handle them
    return super.catch(exception, host);
  }
}
