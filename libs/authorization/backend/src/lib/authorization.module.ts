import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CaslFactory } from '@simpler/authorization/core';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  exports: [CaslFactory, PassportModule],
  providers: [CaslFactory],
})
export class AuthorizationModule {}
