import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatSeconds',
})
export class FormatSecondsPipe implements PipeTransform {
  transform(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;

    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return hours
      ? `${this.addZeroPadding(hours)}:${this.addZeroPadding(
          minutes
        )}:${this.addZeroPadding(seconds)}`
      : `${minutes}:${this.addZeroPadding(seconds)}`;
  }

  addZeroPadding(num: number) {
    return num.toString().length < 2 ? '0' + num : num + '';
  }
}
