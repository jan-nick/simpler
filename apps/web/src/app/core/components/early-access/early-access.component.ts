import { Component, EventEmitter, Output } from '@angular/core';
import { EarlyAccessService } from '../../services/early-access.service';

@Component({
  selector: 'simpler-early-access',
  templateUrl: './early-access.component.html',
  styleUrls: ['./early-access.component.scss'],
})
export class EarlyAccessComponent {
  @Output() readonly earlyAccess = new EventEmitter<boolean>();

  earlyAccessCode = '';

  constructor(public readonly earlyAccessService: EarlyAccessService) {}
}
