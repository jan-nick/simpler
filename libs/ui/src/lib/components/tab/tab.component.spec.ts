import { TabComponent, TabSelect } from './tab.component';

import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('TabComponent', () => {
  let spectator: Spectator<TabComponent>;
  let component: TabComponent;

  let containerElement: HTMLDivElement | null;

  const createComponent = createComponentFactory({
    component: TabComponent,
    providers: [],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;

    containerElement = spectator.query('.simpler-tab');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should remove ability to focus host (tabIndex = "-1")', () => {
    expect(spectator.component['tabIndex']).toBe('-1');
  });

  it('should set selected', () => {
    expect(component.selected).toBeFalsy();

    component.selected = true;
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-tab-selected');
    expect(containerElement).not.toHaveAttribute('hidden');

    component.selected = false;
    spectator.detectChanges();

    expect(containerElement).not.toHaveClass('simpler-tab-selected');
    expect(containerElement).toHaveAttribute('hidden');
  });

  describe('selectTab', () => {
    it('should set selected to true', () => {
      component.selectTab();
      spectator.detectChanges();

      expect(component.selected).toBeTruthy();
    });

    it('should call emitSelect', () => {
      jest.spyOn(component, 'emitSelect');

      component.selectTab();

      expect(component.emitSelect).toBeCalledTimes(1);
    });
  });

  describe('emitSelect', () => {
    it('should emit a TabSelect event', () => {
      jest.spyOn(component.select, 'emit');

      component.selected = true;

      component.emitSelect();

      const event = new TabSelect();
      event.selected = true;
      event.source = component;

      expect(component.select.emit).toHaveBeenNthCalledWith(1, event);
    });
  });
});
