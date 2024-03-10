import { Pipe, PipeTransform } from '@angular/core';

/** 

Returns a supplied numeric expression rounded to the nearest integer.

@param value — The value to be rounded to the nearest integer.
@param  — .

*/
@Pipe({
  name: 'round',
})
export class RoundPipe implements PipeTransform {
  transform(value: number, decimals = 0): number {
    return Number(Math.round(Number(`${value}e${decimals}`)) + `e-${decimals}`);
  }
}
