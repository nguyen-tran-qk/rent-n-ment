import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { MediaProvider } from '../providers/media/media';
import { UserPage } from '../pages/user/user';
import { MenuPage } from '../pages/menu/menu';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = MenuPage;
  pages: {title: string, component: any}[];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private mediaProvider: MediaProvider) {
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });

    this.pages = [
      { title: 'Home', component: HomePage },
    ];
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.mediaProvider.loggedIn = true;
      this.mediaProvider.getCurrentUser().subscribe(data => {
        this.mediaProvider.user = data;
        this.pages = this.pages.concat([
          { title: 'My profile', component: UserPage },
          { title: 'Log out', component: LoginRegisterPage },
        ]);
      });
    } else {
      this.pages = this.pages.concat([
        { title: 'Login', component: LoginRegisterPage },
      ]);
    }
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}

