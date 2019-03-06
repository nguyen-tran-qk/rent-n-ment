import { Pipe, PipeTransform } from '@angular/core';
import { PRODUCT_STATUS } from '../../constants';

/**
 * Generated class for the ProductStatusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'productStatus',
})
export class ProductStatusPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    const statusList = Object.keys(PRODUCT_STATUS);
    const status = statusList.filter(item => PRODUCT_STATUS[item] === value);
    return status;
  }
}
