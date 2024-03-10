import { initialState } from './library-file-play.reducer';
import { selectLibraryFilePlay } from './library-file-play.selectors';

describe('libraryFilePlaySelectors', () => {
  it('should select state', () => {
    const result = selectLibraryFilePlay.projector(initialState);
    expect(result).toStrictEqual(initialState);
  });
});
