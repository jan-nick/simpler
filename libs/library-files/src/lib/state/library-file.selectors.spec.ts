import { initialState } from './library-file.reducer';
import { selectLibraryFile } from './library-file.selectors';

describe('LibraryFileSelectors', () => {
  it('should select state', () => {
    const result = selectLibraryFile.projector(initialState);
    expect(result).toStrictEqual(initialState);
  });
});
