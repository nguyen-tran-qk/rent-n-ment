import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interfaces/interface';

/**
 * Generated class for the GetUserAvatarPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'getUserAvatar',
})
export class GetUserAvatarPipe implements PipeTransform {
  constructor(public mediaProvider: MediaProvider) {
  }

  async transform(user_id: number, ...args) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getFilesByTag('profile').subscribe((responses: Media[]) => {
        let result = null;
        responses.forEach((response: Media) => {
          if (response.user_id === user_id) {
            result = response.file_id;
          }
        });
        resolve(result);
      });
    });
  }
}
