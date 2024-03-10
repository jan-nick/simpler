import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AnimationDuration } from '@simpler/types';
import {
  bounceOnEnterAnimation,
  fadeInUpOnEnterAnimation,
  zoomInOnEnterAnimation,
} from 'angular-animations';

@Component({
  selector: 'simpler-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    zoomInOnEnterAnimation({ duration: AnimationDuration.Longer }),
    fadeInUpOnEnterAnimation({
      duration: AnimationDuration.Longer,
      delay: AnimationDuration.Normal,
    }),
    bounceOnEnterAnimation({ delay: AnimationDuration.Longest }),
  ],
})
export class HomeComponent {
  constructor(
    private title: Title,
    private translateService: TranslateService
  ) {
    this.title.setTitle(this.translateService.instant('pages.home.pageTitle'));
  }
}
