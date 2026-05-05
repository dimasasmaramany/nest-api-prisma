import { BadRequestException, ValidationError } from '@nestjs/common';

export const formatValidationErrors = (errors: ValidationError[]) => {
  const formattedErrors = errors.map((err) => {
    return {
      field: err.property,
      messages: err.constraints ? Object.values(err.constraints) : [],
    };
  });

  return new BadRequestException({
    status: false,
    message: 'Validation failed',
    errors: formattedErrors,
  });
};
