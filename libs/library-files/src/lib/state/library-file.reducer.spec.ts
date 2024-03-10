import { libraryFileReducer, initialState } from './library-file.reducer';

describe('libraryFileReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = libraryFileReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });
});
