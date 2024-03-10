import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import {
  Auth,
  ForgotPasswordError,
  RefreshError,
  LoginError,
  SignUpError,
} from '@simpler/types';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { EmailService } from '../core/email/email.service';
import { EmailTemplate } from '../core/email/enums/email-template.enum';
import { environment } from '@simpler-env';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LogoutDto } from './dto/logout.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(
        `No user found for email: ${email}`,
        LoginError.UserNotFound
      );
    }

    const passwordValid = await compare(password, user?.password);
    if (!passwordValid) {
      throw new UnauthorizedException(
        'Invalid password',
        LoginError.InvalidCredentials
      );
    }

    return user;
  }

  async login({ email }: LoginDto): Promise<Auth> {
    const user = await this.usersService.findOneByEmail(email);
    const tokens = await this.getTokens(user.id, email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async signUp({ email, password }: SignUpDto): Promise<Auth> {
    const user = await this.usersService
      .create({ email, password })
      .catch(() => {
        throw new UnauthorizedException(
          `Email address is already taken: ${email}`,
          SignUpError.EmailTaken
        );
      });

    const tokens = await this.getTokens(user.id, email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    await this.emailService.send({
      dynamicTemplateData: {
        redirectUrl: `${environment.frontendUrl}/sign-up/success`,
      },
      templateId: EmailTemplate.Signup,
      to: email,
      subject: 'Confirm signup',
    });

    return { ...tokens, user };
  }

  async logout({ userId }: LogoutDto): Promise<void> {
    await this.usersService.update(userId, { refreshToken: null });
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(
        `No user found for email: ${email}`,
        ForgotPasswordError.UserNotFound
      );
    }

    // TODO: Limit tries
    await this.emailService.send({
      dynamicTemplateData: {
        redirectUrl: `${environment.frontendUrl}/reset-password/new?id=${user.id}`,
      },
      templateId: EmailTemplate.ForgotPassword,
      to: email,
      subject: 'Reset password',
    });
  }

  async resetPassword({ userId, password }: ResetPasswordDto) {
    await this.usersService.updatePassword(userId, { password });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);

    if (!user?.refreshToken) {
      throw new UnauthorizedException(
        'Access denied: missing token',
        RefreshError.MissingToken
      );
    }

    const refreshTokenMatches = await compare(refreshToken, user.refreshToken);

    if (!refreshTokenMatches) {
      throw new UnauthorizedException(
        'Access denied: missing token',
        RefreshError.MissingToken
      );
    }

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const saltOrRounds = this.configService.get<string>(
      'PASSWORD_HASH_SALT_ROUNDS'
    );
    const hashedRefreshToken = await hash(refreshToken, Number(saltOrRounds));

    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  private async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
        }
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
