import { userReducer, initialState } from './user.reducer';

describe('userReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = userReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });
});
