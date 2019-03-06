import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductsPage } from '../pages/products/products';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { UserPage } from '../pages/user/user';
import { MediaProvider } from '../providers/media/media';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { ProductProvider } from '../providers/product/product';
import { AddProductPage } from '../pages/add-product/add-product';
import { ModifyPage } from '../pages/modify/modify';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductsPage,
    ProductDetailsPage,
    LoginRegisterPage,
    UserPage,
    AddProductPage,
    ModifyPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PipesModule,
    PinchZoomModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductsPage,
    ProductDetailsPage,
    LoginRegisterPage,
    UserPage,
    AddProductPage,
    ModifyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider,
    ProductProvider,
  ]
})
export class AppModule {}
