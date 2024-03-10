import { libraryFolderReducer, initialState } from './library-folder.reducer';

describe('libraryFolderReducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = {
        type: 'Unknown',
      };
      const state = libraryFolderReducer(initialState, action);
      expect(state).toBe(initialState);
    });
  });
});
