import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { enUS } from 'date-fns/locale';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { AnimationDuration, Language } from '@simpler/types';
import { EarlyAccessService } from './core/services/early-access.service';

@Component({
  selector: 'simpler-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOnEnterAnimation({ duration: AnimationDuration.Shorter })],
  providers: [NgbTooltipConfig],
})
export class AppComponent {
  constructor(
    public readonly earlyAccessService: EarlyAccessService,
    private readonly translateService: TranslateService,
    private readonly dateFnsConfigurationService: DateFnsConfigurationService,
    private readonly meta: Meta,
    private readonly ngbTooltipConfig: NgbTooltipConfig
  ) {
    this.initLocale();
    this.initMetaTags();
    this.initNgbConfigs();
  }

  initMetaTags() {
    this.meta.addTags([
      {
        tag: 'description',
        name: 'description',
        content: this.translateService.instant('meta.description'),
      },
      {
        tag: 'og:title',
        name: 'og:title',
        content: this.translateService.instant('meta.og:title'),
      },
      {
        tag: 'og:description',
        name: 'og:description',
        content: this.translateService.instant('meta.og:description'),
      },
    ]);
  }

  initLocale() {
    this.translateService.setDefaultLang(Language.EN);
    this.dateFnsConfigurationService.setLocale(enUS);
  }

  initNgbConfigs() {
    this.ngbTooltipConfig.openDelay = AnimationDuration.Normal;
  }
}
