import { NgModule } from '@angular/core';
import { GetUserPipe } from './get-user/get-user';
import { ThumbnailPipe } from './thumbnail/thumbnail';
@NgModule({
  declarations: [GetUserPipe, ThumbnailPipe],
  imports: [],
  exports: [GetUserPipe, ThumbnailPipe]
})
export class PipesModule {}
