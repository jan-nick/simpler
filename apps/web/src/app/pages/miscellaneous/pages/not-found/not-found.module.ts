import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '@simpler/ui';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule, TranslateModule, UIModule],
})
export class NotFoundModule {}
