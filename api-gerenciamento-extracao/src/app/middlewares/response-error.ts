import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/app.error';
import { ValidationError } from '../errors/validation.error';
import { DuplicateEntryError } from '../errors/database.error';
import { NotFoundError } from '../errors/not-found.error';
import { QueryFailedError } from 'typeorm';

export function responseError(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }
  if (error instanceof ValidationError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      issues: error.issues,
    });
  }

  if (error instanceof DuplicateEntryError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  if (error instanceof NotFoundError) {
    return response.status(404).json({
      status: 'error',
      message: error.message,
    });
  }

  if (error instanceof QueryFailedError && (error as any).code === 'ER_DUP_ENTRY') {
    const duplicateError = new DuplicateEntryError('Esse dado já existe no banco de dados.');
    return response.status(duplicateError.statusCode).json({
      status: 'error',
      message: duplicateError.message,
    });
  }

  console.error('Internal server error', error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}
