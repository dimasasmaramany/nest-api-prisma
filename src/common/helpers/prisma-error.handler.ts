/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // 🔴 UNIQUE CONSTRAINT
    if (exception.code === 'P2002') {
      const target = exception.meta?.target;
      const fields = Array.isArray(target) ? target : [];

      return response.status(HttpStatus.BAD_REQUEST).json({
        status: false,
        message: 'Duplicate data',
        errors:
          fields.length > 0
            ? fields.map((field) => ({
                field,
                messages: [`${field} already exists`],
              }))
            : [{ field: 'unknown', messages: ['Unique constraint failed'] }],
      });
    }

    // 🔴 RECORD NOT FOUND
    if (exception.code === 'P2025') {
      return response.status(HttpStatus.NOT_FOUND).json({
        status: false,
        message: 'Data not found',
        errors: [{ field: 'id', messages: ['Record does not exist'] }],
      });
    }

    // 🔴 FOREIGN KEY CONSTRAINT FAILED
    if (exception.code === 'P2003') {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: false,
        message: 'Foreign key constraint failed',
        errors: [
          { field: 'relation', messages: ['Related record not found'] },
        ],
      });
    }

    // 🔴 DEFAULT FALLBACK
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: 'Internal server error',
      error: exception.message,
    });
  }
}
