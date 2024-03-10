import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EarlyAccessService {
  private readonly EARLY_ACCESS_CODE = 'TRYOUTSIMPLER';
  
  private readonly earlyAccess = new BehaviorSubject<boolean>(
    localStorage.getItem('hasEarlyAccess') === true + ''
  );
  readonly earlyAccess$ = this.earlyAccess.asObservable();

  submitEarlyAccess(earlyAccessCode: string) {
    const hasEarlyAccess = earlyAccessCode === this.EARLY_ACCESS_CODE;

    if (hasEarlyAccess) {
      localStorage.setItem('hasEarlyAccess', true + '');
    }

    this.earlyAccess.next(hasEarlyAccess);
  }
}
