import { Pipe, PipeTransform } from '@angular/core';
import { ProductComment } from '../../interfaces/interface';

/**
 * Generated class for the SortPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: [], ...args) {
    switch (args[0]) {
      case 'comment':
        return value.sort((a: ProductComment, b: ProductComment) => a.comment_id - b.comment_id);
      default:
        return value;
    }
  }
}
