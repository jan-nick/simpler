import { User } from '@prisma/client';

export interface Auth {
  accessToken: string;
  user: User;
}
export interface Credentials {
  email: string;
  password: string;
}
