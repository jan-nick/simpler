import { initialState } from './user.reducer';
import { selectUser } from './user.selectors';

describe('UserSelectors', () => {
  it('should select state', () => {
    const result = selectUser.projector(initialState);
    expect(result).toStrictEqual(initialState);
  });
});
