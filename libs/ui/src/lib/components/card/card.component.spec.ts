import { CardComponent } from './card.component';

import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { TranslateService } from '@ngx-translate/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { IconComponent } from '../icon/icon.component';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

describe('CardComponent', () => {
  let spectator: SpectatorHost<CardComponent>;
  let component: CardComponent;

  let containerElement: HTMLDivElement | null;
  let titleElement: HTMLHeadingElement | null;
  let subtitleElement: HTMLParagraphElement | null;
  let bodyElement: HTMLParagraphElement | null;
  let icon: IconComponent | null;

  const createHost = createHostFactory({
    component: CardComponent,
    declarations: [MockComponent(IconComponent)],
    imports: [MockModule(NgxBootstrapIconsModule)],
    providers: [MockProvider(TranslateService)],
  });

  beforeEach(() => {
    spectator = createHost(`<simpler-card>Card Text Content</simpler-card>`);
    component = spectator.component;

    containerElement = spectator.query('.simpler-card');
    titleElement = spectator.query('h6.simpler-card-title');
    subtitleElement = spectator.query('p.simpler-card-subtitle');
    bodyElement = spectator.query('p.simpler-card-body');
    icon = spectator.query(IconComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should forward title to corresponding element', () => {
    component.title = 'Card title';
    spectator.detectChanges();

    titleElement = spectator.query('h6.simpler-card-title');

    expect(titleElement).toHaveText('Card title');
  });

  it('should forward subtitle to corresponding element', () => {
    component.subtitle = 'Card subtitle';
    spectator.detectChanges();

    subtitleElement = spectator.query('p.simpler-card-subtitle');

    expect(subtitleElement).toHaveText('Card subtitle');
  });

  it('should forward body to corresponding element', () => {
    component.body = 'Card body';
    spectator.detectChanges();

    bodyElement = spectator.query('p.simpler-card-body');

    expect(bodyElement).toHaveText('Card body');
  });

  describe('icon', () => {
    beforeEach(() => {
      component.icon = 'activity';
      spectator.detectChanges();

      icon = spectator.query(IconComponent);
    });

    it('should add css class', () => {
      expect(containerElement).toHaveClass('simpler-card-has-icon');
    });

    it('should should forward icon', () => {
      expect(icon?.name).toBe('activity');
    });
  });
});
