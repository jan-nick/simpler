import { Auth } from '@simpler/types';
import { userMockFactory } from '../../users/mocks/user.mock';

export const authMockFactory = (auth?: Auth): Auth => ({
  accessToken: 'access token',
  user: userMockFactory(),
  ...auth,
});
