import { AlertComponent } from './alert.component';

import { MockProvider } from 'ng-mocks';
import { TranslateService } from '@ngx-translate/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { ButtonComponent } from '../button/button.component';

describe('AlertComponent', () => {
  let spectator: SpectatorHost<AlertComponent>;
  let component: AlertComponent;

  let containerElement: HTMLDivElement | null;
  let messageElement: HTMLSpanElement | null;
  let dismissButton: ButtonComponent | null;

  const createHost = createHostFactory({
    component: AlertComponent,
    declarations: [ButtonComponent],
    providers: [MockProvider(TranslateService)],
  });

  beforeEach(() => {
    spectator = createHost(`<simpler-alert>Alert Text Content</simpler-alert>`);
    component = spectator.component;

    containerElement = spectator.query('.simpler-alert');
    messageElement = spectator.query('.simpler-alert-message');
    dismissButton = spectator.query(ButtonComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove ability to focus host (tabIndex = "-1")', () => {
    expect(component['tabIndex']).toBe('-1');
  });

  it('should set dismissed to false by default', () => {
    expect(component.dismissed).toBeFalsy();
  });

  it('should hide container element if dismissed', () => {
    component.dismissed = true;
    spectator.detectChanges();

    containerElement = spectator.query('.simpler-alert');

    expect(containerElement).toBeFalsy();

    component.dismissed = false;
    spectator.detectChanges();

    containerElement = spectator.query('.simpler-alert');

    expect(containerElement).toBeTruthy();
  });

  it('should forward content to message element', () => {
    expect(messageElement).toHaveText('Alert Text Content');
  });

  it('should set color to primary by default', () => {
    expect(component.color).toBe('primary');
  });

  it('should add a css class for each color type', () => {
    component.color = 'secondary';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-alert-secondary');

    component.color = 'danger';
    spectator.detectChanges();

    expect(containerElement).toHaveClass('simpler-alert-danger');
  });

  describe('dismiss button', () => {
    beforeEach(() => {
      component.dismissable = true;
      spectator.detectChanges();

      dismissButton = spectator.query(ButtonComponent);
    });

    it('should set dismissable', () => {
      component.dismissable = true;
      spectator.detectChanges();

      dismissButton = spectator.query(ButtonComponent);

      expect(dismissButton).toBeTruthy();
      expect(containerElement).toHaveClass('simpler-alert-dismissable');

      component.dismissable = false;
      spectator.detectChanges();

      dismissButton = spectator.query(ButtonComponent);

      expect(dismissButton).toBeFalsy();
      expect(containerElement).not.toHaveClass('simpler-alert-dismissable');
    });

    it('should call dismiss on dismiss button click', () => {
      jest.spyOn(component, 'dismiss');

      spectator.click('.simpler-alert-dismiss-button');

      expect(component.dismiss).toBeCalledTimes(1);
    });
  });

  describe('dismiss', () => {
    it('should set dismissed to true', () => {
      component.dismissed = false;

      component.dismiss();

      expect(component.dismissed).toBeTruthy();
    });
  });
});
