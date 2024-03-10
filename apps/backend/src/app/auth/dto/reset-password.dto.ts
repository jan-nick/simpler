import { IsNotEmpty, IsUUID, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsUUID()
  userId: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
