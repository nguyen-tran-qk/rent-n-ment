import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductsPage } from '../products/products';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  categories = [];

  pushPage: any;
  imagen: string;
  category: string;
  subcategory: string;

  constructor(public navCtrl: NavController) {
    this.categories = [
      {
        image: 'http://placehold.it/300x200',
        category: 'Mobile phones',
        subcategory: 'Product Catalog'
      }
    ];
  }

  pushCategory(category) {
    this.navCtrl.push(ProductsPage, { category });
  }
}
