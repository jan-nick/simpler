import { User } from '@prisma/client';

export const userMockFactory = (user?: Partial<User>): User => ({
  id: 'user id',
  avatar: 'user avatar',
  name: 'user name',
  password: 'user password',
  refreshToken: 'user refresh token',
  email: 'example@mail',
  createdAt: new Date('2020-01-01T12:00:00Z'),
  updatedAt: new Date('2020-01-01T12:00:00Z'),
  ...user,
});
