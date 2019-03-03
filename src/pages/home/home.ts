import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { LoginRegisterPage } from '../login-register/login-register';
import { MediaProvider } from '../../providers/media/media';
import { categories } from '../../constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  categories = categories;
  pushPage: any;
  imagen: string;
  category: string;
  subcategory: string;

  constructor(
    public navCtrl: NavController, public mediaProvider: MediaProvider) {
  }

  pushCategory(categoryKey: string) {
    this.navCtrl.push(ProductsPage, { categoryKey }).catch();
  }

  signIn() {
    this.navCtrl.push(LoginRegisterPage).catch();
  }
}
