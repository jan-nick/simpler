import { IconComponent, iconSizeSpecs } from './icon.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';
import {
  NgxBootstrapIconsLibComponent,
  NgxBootstrapIconsModule,
} from 'ngx-bootstrap-icons';

describe('IconComponent', () => {
  let spectator: Spectator<IconComponent>;
  let component: IconComponent;

  let containerElement: HTMLDivElement | null;
  let icon: NgxBootstrapIconsLibComponent | null;
  let iconElement: Element | null;

  const createComponent = createComponentFactory({
    component: IconComponent,
    imports: [MockModule(NgxBootstrapIconsModule)],
    providers: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    containerElement = spectator.query('.simpler-icon');
    icon = spectator.query(NgxBootstrapIconsLibComponent);
    iconElement = spectator.query('i-bs');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should foward name to icon', () => {
    component.name = 'activity';
    spectator.detectChanges();

    expect(icon?.name).toBe('activity');

    component.name = 'alarm';
    spectator.detectChanges();

    expect(icon?.name).toBe('alarm');
  });

  it('should set height and width using size specs', () => {
    component.size = 'large';
    spectator.detectChanges();

    expect(iconElement).toHaveStyle({ height: iconSizeSpecs.large });
    expect(iconElement).toHaveStyle({ width: iconSizeSpecs.large });

    expect(icon?.height).toBe(iconSizeSpecs.large);
    expect(icon?.width).toBe(iconSizeSpecs.large);

    component.size = 'small';
    spectator.detectChanges();

    expect(iconElement).toHaveStyle({ height: iconSizeSpecs.small });
    expect(iconElement).toHaveStyle({ width: iconSizeSpecs.small });

    expect(icon?.height).toBe(iconSizeSpecs.small);
    expect(icon?.width).toBe(iconSizeSpecs.small);
  });

  it('should add css class when with background', () => {
    component.withBackground = true;
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-icon-with-background');
  });

  it('should add a css class for each size type', () => {
    component.size = 'large';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-icon-large');

    component.size = 'small';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-icon-small');
  });
});
