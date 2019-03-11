import { NgModule } from '@angular/core';
import { GetUserPipe } from './get-user/get-user';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { ProductStatusPipe } from './product-status/product-status';
import { GetUserAvatarPipe } from './get-user-avatar/get-user-avatar';
import { SortPipe } from './sort/sort';
import { ProductStatusColorPipe } from './product-status-color/product-status-color';
@NgModule({
  declarations: [GetUserPipe, ThumbnailPipe,
    ProductStatusPipe,
    GetUserAvatarPipe,
    SortPipe,
    ProductStatusColorPipe],
  imports: [],
  exports: [GetUserPipe, ThumbnailPipe,
    ProductStatusPipe,
    GetUserAvatarPipe,
    SortPipe,
    ProductStatusColorPipe]
})
export class PipesModule {}
