import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductsPage } from '../products/products';
import { LoginRegisterPage } from '../login-register/login-register';
import { MediaProvider } from '../../providers/media/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  categoryKeyPrefix = 'rentnmend.categories';
  categories = [
    {
      image: 'assets/imgs/clothing.jpg',
      name: 'Clothing',
      key: this.categoryKeyPrefix + '.clothing'
    },
    {
      image: 'assets/imgs/vehicles.jpg',
      name: 'Vehicles',
      key: this.categoryKeyPrefix + '.vehicles'
    },
    {
      image: 'assets/imgs/electronics.jpg',
      name: 'Electronics',
      key: this.categoryKeyPrefix + '.electronics'
    },
    {
      image: 'assets/imgs/stationary.jpg',
      name: 'Stationary',
      key: this.categoryKeyPrefix + '.stationary'
    },
    {
      image: 'assets/imgs/sport.jpg',
      name: 'Sports',
      key: this.categoryKeyPrefix + '.sports'
    },
    {
      image: 'assets/imgs/others.jpg',
      name: 'Others',
      key: this.categoryKeyPrefix + '.others'
    },
  ];

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
