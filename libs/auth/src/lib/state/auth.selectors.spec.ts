import { initialState } from './auth.reducer';
import { selectAuth } from './auth.selectors';

describe('AuthSelectors', () => {
  it('should select state', () => {
    const result = selectAuth.projector(initialState);
    expect(result).toStrictEqual(initialState);
  });
});
