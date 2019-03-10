import { NgModule } from '@angular/core';
import { GetUserPipe } from './get-user/get-user';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { ProductStatusPipe } from './product-status/product-status';
import { GetUserAvatarPipe } from './get-user-avatar/get-user-avatar';
import { SortPipe } from './sort/sort';
@NgModule({
  declarations: [GetUserPipe, ThumbnailPipe,
    ProductStatusPipe,
    GetUserAvatarPipe,
    SortPipe],
  imports: [],
  exports: [GetUserPipe, ThumbnailPipe,
    ProductStatusPipe,
    GetUserAvatarPipe,
    SortPipe]
})
export class PipesModule {}
