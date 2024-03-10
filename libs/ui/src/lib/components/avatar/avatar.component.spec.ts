import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AvatarComponent, avatarSizeSpecs } from './avatar.component';

describe('AvatarComponent', () => {
  let spectator: Spectator<AvatarComponent>;
  let component: AvatarComponent;

  let containerElement: HTMLDivElement | null;
  let imgElement: HTMLImageElement | null;

  const createComponent = createComponentFactory({
    component: AvatarComponent,
    imports: [],
    providers: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    component.src = 'avatar src';
    spectator.detectChanges();

    containerElement = spectator.query('.simpler-avatar');
    imgElement = spectator.query('.simpler-avatar-image');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set size to medium by default', () => {
    expect(component.size).toBe('medium');
  });

  it('should add a css class for each size type', () => {
    component.size = 'large';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-avatar-large');

    component.size = 'small';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-avatar-small');
  });

  it('should set height and width using size specs', () => {
    component.size = 'large';
    spectator.detectChanges();

    expect(containerElement).toHaveStyle({ height: avatarSizeSpecs.large });
    expect(containerElement).toHaveStyle({ width: avatarSizeSpecs.large });

    expect(imgElement).toHaveAttribute('height', avatarSizeSpecs.large);
    expect(imgElement).toHaveAttribute('width', avatarSizeSpecs.large);

    component.size = 'small';
    spectator.detectChanges();

    expect(containerElement).toHaveStyle({ height: avatarSizeSpecs.small });
    expect(containerElement).toHaveStyle({ width: avatarSizeSpecs.small });

    expect(imgElement).toHaveAttribute('height', avatarSizeSpecs.small);
    expect(imgElement).toHaveAttribute('width', avatarSizeSpecs.small);
  });

  it('should forward src to img element', () => {
    component.src = 'avatar src';
    spectator.detectChanges();

    expect(imgElement).toHaveAttribute('src', 'avatar src');
  });

  it('should forward srcset to img element', () => {
    component.srcset = 'avatar srcset';
    spectator.detectChanges();

    expect(imgElement).toHaveAttribute('srcset', 'avatar srcset');
  });

  it('should forward sizes to img element', () => {
    component.sizes = 'avatar sizes';
    spectator.detectChanges();

    expect(imgElement).toHaveAttribute('sizes', 'avatar sizes');
  });

  it('should forward alt to img element', () => {
    component.alt = 'avatar alt';
    spectator.detectChanges();

    expect(imgElement).toHaveAttribute('alt', 'avatar alt');
  });
});
