import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = this.configService.get<string>(
      'PASSWORD_HASH_SALT_ROUNDS'
    );
    const hashedPassword = await hash(
      createUserDto.password,
      Number(saltOrRounds)
    );

    return this.prisma.user.create({
      data: { email: createUserDto.email, password: hashedPassword },
    });
  }

  findAll(args: Prisma.UserFindManyArgs) {
    return this.prisma.user.findMany(args);
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updatePassword(
    id: string,
    updatePasswordUserDto: UpdatePasswordUserDto
  ) {
    const saltOrRounds = this.configService.get<string>(
      'PASSWORD_HASH_SALT_ROUNDS'
    );
    const hashedPassword = await hash(
      updatePasswordUserDto.password,
      Number(saltOrRounds)
    );

    return this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
