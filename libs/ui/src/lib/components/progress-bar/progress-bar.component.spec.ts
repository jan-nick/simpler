import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let spectator: Spectator<ProgressBarComponent>;
  let component: ProgressBarComponent;

  let containerElement: HTMLDivElement | null;
  let progressBarValueElement: HTMLDivElement | null;

  const createComponent = createComponentFactory({
    component: ProgressBarComponent,
    providers: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    containerElement = spectator.query('.simpler-progress-bar');
    progressBarValueElement = spectator.query('.simpler-progress-bar-value');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clamp value between 0 and 100', () => {
    component.value = 120;

    expect(component.value).toBe(100);

    component.value = -20;

    expect(component.value).toBe(0);
  });

  it('should add a css class for each size', () => {
    component.size = 'large';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain('simpler-progress-bar-large');

    component.size = 'small';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain('simpler-progress-bar-small');
  });

  it('should add a css class for each captionPosition when caption exists', () => {
    component.caption = 'caption';

    component.captionPosition = 'bottom-left';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain(
      'simpler-progress-bar-caption-bottom-left'
    );

    component.captionPosition = 'inline-right';
    spectator.detectChanges();

    expect(containerElement?.classList).toContain(
      'simpler-progress-bar-caption-inline-right'
    );
  });

  it('should set simpler-progress-bar-value scale', () => {
    component.value = 0;
    spectator.detectChanges();

    expect(progressBarValueElement?.style.transform).toBe('scaleX(0)');

    component.value = 50;
    spectator.detectChanges();

    expect(progressBarValueElement?.style.transform).toBe('scaleX(0.5)');
  });
});
