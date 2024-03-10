import { createAccessibleByFactory } from '@casl/prisma/runtime';
import {
  ContextType,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

const accessibleBy = createAccessibleByFactory();

/**
 * Parameter decorator that provides a CASL `accessibleBy` result for the current user.
 * Requires a string as a paramater that is a Prisma model name. It will provide the
 * Prisma `WhereInput` for the specified subject which can be used within a Prisma query
 * to filter the results.
 * ```ts
 * ＠UseGuards(CaslGuard)
 * async getLibraryFiles(＠CaslAccessible('LibraryFile') accessibleLibraryFiles: Prisma.LibraryFileWhereInput) { ... }
 * ```
 * @see [CASL Prisma docs](https://casl.js.org/v6/en/package/casl-prisma)
 */
export const CaslAccessible = createParamDecorator(
  (data: Prisma.ModelName, context: ExecutionContext) => {
    if (typeof data !== 'string')
      throw new Error(
        'CaslAccessible decorator requires a subject name for a parameter'
      );

    let req;
    const type = context.getType() as ContextType;

    if (type === 'http') {
      req = context.switchToHttp().getRequest();
    } else {
      throw new UnauthorizedException(`Context ${type} not supported`);
    }

    if (!req.ability)
      throw new UnauthorizedException('No ability found for request');
    if (!req.accessibleWhereInputs)
      req.accessibleWhereInputs = accessibleBy(req.ability);

    try {
      return req.accessibleWhereInputs[data];
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }
);
