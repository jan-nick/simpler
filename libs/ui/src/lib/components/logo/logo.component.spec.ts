import { LogoComponent } from './logo.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MockModule, MockProvider } from 'ng-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { waitForAsync } from '@angular/core/testing';

describe('LogoComponent', () => {
  let spectator: Spectator<LogoComponent>;
  let component: LogoComponent;

  let containerElement: HTMLDivElement | null;

  const createComponent = createComponentFactory({
    component: LogoComponent,
    imports: [MockModule(HttpClientTestingModule)],
    providers: [
      MockProvider(HttpClient, {
        get: jest.fn().mockReturnValue(of('<svg></svg>')),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    containerElement = spectator.query('.simpler-logo');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a css class for each size type', () => {
    component.size = 'large';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-logo-large');

    component.size = 'small';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-logo-small');
  });

  it('should forward svgLogo to content of container element', waitForAsync(() => {
    const svg = spectator.query('svg');

    expect(svg).toBeTruthy();
  }));
});
