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
  categories = [
    {
      image: 'assets/imgs/clothing.jpg',
      name: 'Clothing'
    },
    {
      image: 'assets/imgs/vehicles.jpg',
      name: 'Vehicles'
    },
    {
      image: 'assets/imgs/electronics.jpg',
      name: 'Electronics'
    },
    {
      image: 'assets/imgs/stationary.jpg',
      name: 'Stationary'
    },
    {
      image: 'assets/imgs/sport.jpg',
      name: 'Sports'
    },
    {
      image: 'assets/imgs/others.jpg',
      name: 'Others'
    },
  ];

  pushPage: any;
  imagen: string;
  category: string;
  subcategory: string;

  constructor(
    public navCtrl: NavController, public mediaProvider: MediaProvider) {
  }

  pushCategory(category) {
    this.navCtrl.push(ProductsPage, { category }).catch();
  }

  signIn() {
    this.navCtrl.push(LoginRegisterPage).catch();
  }
}
