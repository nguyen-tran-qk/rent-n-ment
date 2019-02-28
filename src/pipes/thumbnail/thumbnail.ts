import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interfaces/interface';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
  // pure: false,
})
export class ThumbnailPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  // private thumbnail = '';
  // private cachedId;

  constructor(private mediaProvider: MediaProvider) {

  }

  async transform(id: number, ...args) {
    // pure version
    return new Promise((resolve, reject) => {
      this.mediaProvider.getSingleMedia(id).subscribe((response: Media) => {
        switch (args[0]) {
          case 'large':
            resolve(response.thumbnails.w640);
            break;
          case 'medium':
            resolve(response.thumbnails.w320);
            break;
          case 'screenshot':
            resolve(response.screenshot);
            break;

          default:
            resolve(response.thumbnails.w160);
        }
      });

    });
  }
}