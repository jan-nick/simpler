import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { ParseArgs } from '@simpler/utils/backend';
import {
  CaslAbility,
  CaslGuard,
  CaslPolicy,
} from '@simpler/authorization/backend';
import {
  AppAbility,
  CreateUserPolicyHandler,
  DeleteUserPolicyHandler,
  ReadUserPolicyHandler,
  UpdateUserPolicyHandler,
} from '@simpler/authorization/core';

@UseGuards(CaslGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CaslPolicy(CreateUserPolicyHandler())
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @CaslAbility() ability: AppAbility
  ) {
    const canAccess = CreateUserPolicyHandler()(ability, createUserDto);

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.usersService.create(createUserDto);
  }

  @CaslPolicy(ReadUserPolicyHandler())
  @Get()
  async findAll(
    @ParseArgs() args: Prisma.UserFindManyArgs,
    @CaslAbility() ability: AppAbility
  ) {
    const users = await this.usersService.findAll(args);

    users.forEach((user) => {
      const canAccess = ReadUserPolicyHandler()(ability, user);

      if (!canAccess) {
        throw new ForbiddenException();
      }
    });

    return users;
  }

  @CaslPolicy(ReadUserPolicyHandler())
  @Get(':id')
  async findOne(@Param('id') id: string, @CaslAbility() ability: AppAbility) {
    const user = await this.usersService.findOne(id);

    const canAccess = ReadUserPolicyHandler()(ability, user);

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return user;
  }

  @CaslPolicy(UpdateUserPolicyHandler())
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CaslAbility() ability: AppAbility
  ) {
    const user = await this.usersService.findOne(id);

    const canAccess = UpdateUserPolicyHandler()(ability, user);

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.usersService.update(id, updateUserDto);
  }

  @CaslPolicy(DeleteUserPolicyHandler())
  @Delete(':id')
  async remove(@Param('id') id: string, @CaslAbility() ability: AppAbility) {
    const user = await this.usersService.findOne(id);

    const canAccess = DeleteUserPolicyHandler()(ability, user);

    if (!canAccess) {
      throw new ForbiddenException();
    }

    return this.usersService.remove(id);
  }
}
