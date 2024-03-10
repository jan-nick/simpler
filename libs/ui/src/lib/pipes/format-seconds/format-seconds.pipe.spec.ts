import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

import { FormatSecondsPipe } from './format-seconds.pipe';

describe('FormatSecondsPipe', () => {
  let spectator: SpectatorPipe<FormatSecondsPipe>;
  const createPipe = createPipeFactory(FormatSecondsPipe);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should transform number of seconds totalling to under an hour into "mm:ss"', () => {
    spectator = createPipe(`{{ 90 | formatSeconds }}`);
    expect(spectator.element).toHaveText('1:30');
  });

  it('should transform number of seconds totalling to over an hour into "hh:mm:ss"', () => {
    spectator = createPipe(`{{ 3690 | formatSeconds }}`);
    expect(spectator.element).toHaveText('01:01:30');
  });
});
