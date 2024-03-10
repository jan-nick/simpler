import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[simplerNavigateBack]',
})
export class NavigateBackDirective {
  constructor(private location: Location) {}

  navigateBack() {
    this.location.back();
  }

  @HostListener('click', ['$event']) onClick() {
    this.navigateBack();
  }
}
