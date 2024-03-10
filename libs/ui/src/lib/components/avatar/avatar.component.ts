import { Component, HostBinding, Input } from '@angular/core';

export type AvatarSize = 'small' | 'medium' | 'large';

export const avatarSizeSpecs = {
  small: '32px',
  medium: '48px',
  large: '96px',
};

@Component({
  selector: 'simpler-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() size: AvatarSize = 'medium';

  @Input() name = '';

  @Input() src?: string | null = '';
  @Input() srcset = '';
  @Input() sizes = '';

  @Input() alt = '';

  readonly sizeSpecs = avatarSizeSpecs;

  @HostBinding('attr.tabIndex') private readonly tabIndex = '0';

  readonly nameInitialsBackgroundColor = 'b18fef';
  get initialsSrc() {
    return `https://avatar.oxro.io/avatar.svg?name=${
      this.name || 'N+A'
    }&background=${this.nameInitialsBackgroundColor}`;
  }
}
