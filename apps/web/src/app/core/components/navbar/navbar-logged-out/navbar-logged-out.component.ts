import { Component } from '@angular/core';
import { AnimationDuration } from '@simpler/types';
import { rotateInOnEnterAnimation } from 'angular-animations';

@Component({
  selector: 'simpler-navbar-logged-out',
  templateUrl: './navbar-logged-out.component.html',
  styleUrls: ['./navbar-logged-out.component.scss'],
  animations: [
    rotateInOnEnterAnimation({ duration: AnimationDuration.Normal }),
  ],
})
export class NavbarLoggedOutComponent {}
