import { libraryFilePlayReducer, initialState } from './library-file-play.reducer';

describe('libraryFilePlayReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = libraryFilePlayReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });
});
