import { NgModule } from '@angular/core';
import { GetUserPipe } from './get-user/get-user';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { ProductStatusPipe } from './product-status/product-status';
@NgModule({
  declarations: [GetUserPipe, ThumbnailPipe,
    ProductStatusPipe],
  imports: [],
  exports: [GetUserPipe, ThumbnailPipe,
    ProductStatusPipe]
})
export class PipesModule {}
