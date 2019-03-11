import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ProductStatusColorPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'productStatusColor',
})
export class ProductStatusColorPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number, ...args) {
    switch (value) {
      case -1:
      case 0:
        return 'danger';
      case 1:
        return 'secondary';
      case 2:
      case 3:
        return 'primary';
      default:
        return 'secondary';;
    }
  }
}
