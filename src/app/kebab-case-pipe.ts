import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kebabCase',
  standalone: true
})
export class KebabCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.replace(/\s+/g, '-').toLowerCase();
  }
}
