import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getHours } from 'date-fns';

@Component({
  selector: 'simpler-library-home',
  templateUrl: './library-home.component.html',
  styleUrls: ['./library-home.component.scss'],
})
export class LibraryHomeComponent {
  readonly welcomeMessage = this.generateWelcomeMessage();

  constructor(private readonly translateService: TranslateService) {}

  generateWelcomeMessage(): string {
    const hours = getHours(new Date());
    let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'day';

    if (hours < 12) timeOfDay = 'morning';
    else if (hours < 18) timeOfDay = 'afternoon';
    else if (hours < 24) timeOfDay = 'evening';
    else timeOfDay = 'day';

    return this.translateService.instant(
      `pages.library.welcomeMessage.${timeOfDay}`
    );
  }
}
