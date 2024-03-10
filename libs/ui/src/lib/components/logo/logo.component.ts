import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs';

export type LogoSize = 'small' | 'medium' | 'large';

const svgSource = '../../../../assets/images/logo.svg';

@Component({
  selector: 'simpler-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() size: LogoSize = 'medium';

  readonly svgLogo$ = this.http
    .get(svgSource, { responseType: 'text' })
    .pipe(map((svg) => this.domSanitizer.bypassSecurityTrustHtml(svg)));

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {}
}
