import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DividerComponent } from './components/divider/divider.component';
import { IconComponent } from './components/icon/icon.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { InputComponent } from './components/input/input.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { LogoComponent } from './components/logo/logo.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigateBackDirective } from './directives/navigate-back/navigate-back.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ChipComponent } from './components/chip/chip.component';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { TabComponent } from './components/tab/tab.component';
import { AlertComponent } from './components/alert/alert.component';
import { CardComponent } from './components/card/card.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavButtonComponent } from './components/nav-button/nav-button.component';
import { SliderComponent } from './components/slider/slider.component';
import { ListComponent } from './components/list/list.component';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { DateFnsModule } from 'ngx-date-fns';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemComponent } from './components/item/item.component';
import { BreadCrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { BreadcrumbGroupComponent } from './components/breadcrumb-group/breadcrumb-group.component';
import { FormatSecondsPipe } from './pipes/format-seconds/format-seconds.pipe';
import { RoundPipe } from './pipes/round/round.pipe';
import { FileCoverComponent } from './components/file-cover/file-cover.component';

@NgModule({
  declarations: [
    AlertComponent,
    AvatarComponent,
    BreadCrumbComponent,
    BreadcrumbGroupComponent,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    ChipComponent,
    DividerComponent,
    FileCoverComponent,
    FormatSecondsPipe,
    IconButtonComponent,
    IconComponent,
    InputComponent,
    ItemComponent,
    ListComponent,
    LogoComponent,
    NavButtonComponent,
    NavigateBackDirective,
    ProgressBarComponent,
    RadioButtonComponent,
    RoundPipe,
    SidenavComponent,
    SkeletonComponent,
    SliderComponent,
    SpinnerComponent,
    TabComponent,
    TabGroupComponent,
    ToggleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    NgxBootstrapIconsModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    DateFnsModule,
  ],
  exports: [
    AlertComponent,
    AvatarComponent,
    BreadCrumbComponent,
    BreadcrumbGroupComponent,
    ButtonComponent,
    CardComponent,
    CheckboxComponent,
    ChipComponent,
    DividerComponent,
    FileCoverComponent,
    FormatSecondsPipe,
    IconButtonComponent,
    IconComponent,
    InputComponent,
    ItemComponent,
    ListComponent,
    LogoComponent,
    NavButtonComponent,
    NavigateBackDirective,
    ProgressBarComponent,
    RadioButtonComponent,
    RoundPipe,
    SidenavComponent,
    SkeletonComponent,
    SliderComponent,
    SpinnerComponent,
    TabComponent,
    TabGroupComponent,
    ToggleComponent,
  ],
})
export class UIModule {}
