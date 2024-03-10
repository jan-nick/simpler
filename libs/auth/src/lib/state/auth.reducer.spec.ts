import { authReducer, initialState } from './auth.reducer';

describe('AuthReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = authReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });
});
