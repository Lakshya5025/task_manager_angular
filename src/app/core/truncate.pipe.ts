import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, ...args: number[]): string {
    if (args.length === 0 || args[0] < 0 || value.length <= args[0])
      return value;
    let upatedString = value.slice(0, args[0]) + '...';
    return upatedString;
  }
}
