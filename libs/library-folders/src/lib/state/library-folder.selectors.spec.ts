import { initialState } from './library-folder.reducer';
import { selectLibraryFolder } from './library-folder.selectors';

describe('LibraryFolderSelectors', () => {
  it('should select state', () => {
    const result = selectLibraryFolder.projector(initialState);
    expect(result).toStrictEqual(initialState);
  });
});
