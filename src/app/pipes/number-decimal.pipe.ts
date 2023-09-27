import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberDecimal'
})
export class NumberDecimalPipe implements PipeTransform {

  transform(value: string, args: number): string {
    return Number.parseFloat(value).toFixed(args).replace(".", ",");
  }
}
