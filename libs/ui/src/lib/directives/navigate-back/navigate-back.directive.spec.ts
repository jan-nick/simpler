import { createDirectiveFactory } from '@ngneat/spectator';
import { NavigateBackDirective } from './navigate-back.directive';

describe('NavigateBackDirective', () => {
  const createDirective = createDirectiveFactory({
    directive: NavigateBackDirective,
    template: `<div simplerNavigateBack>Testing DirectiveProvider Directive</div>`,
  });

  it('should get the instance', () => {
    const spectator = createDirective();
    const instance = spectator.directive;
    expect(instance).toBeDefined();
  });
});