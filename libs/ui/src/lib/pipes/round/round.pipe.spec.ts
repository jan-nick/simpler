import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

import { RoundPipe } from './round.pipe';

describe('RoundPipe', () => {
  let spectator: SpectatorPipe<RoundPipe>;
  const createPipe = createPipeFactory(RoundPipe);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should round value', () => {
    spectator = createPipe(`{{ 90.23423 | round }}`);
    expect(spectator.element).toHaveText('90');
  });

  it('should round value with decimals', () => {
    spectator = createPipe(`{{ 90.23423 | round:2 }}`);
    expect(spectator.element).toHaveText('90.23');
  });
});
