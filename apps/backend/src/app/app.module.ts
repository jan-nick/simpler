import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LibraryFilesModule } from './library-files/library-files.module';
import { LibraryFoldersModule } from './library-folders/library-folders.module';
import { StorageModule } from './storage/storage.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LibraryFilePlaysModule } from './library-file-plays/library-file-plays.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    LibraryFilesModule,
    LibraryFoldersModule,
    LibraryFilePlaysModule,
    StorageModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('THROTTLER_TTL'),
        limit: configService.get('THROTTLER_LIMIT'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
