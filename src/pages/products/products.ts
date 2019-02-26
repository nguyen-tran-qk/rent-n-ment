import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  products = [];

  image: string;
  product: string;
  description: string;
  price: number;

  category;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.category = navParams.data.category;

    this.products = [
      {
        image: 'http://placehold.it/300x300',
        product: 'iPhone X',
        description: 'Description Product1',
        longDesciption:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium deleniti voluptate quos, dolore, pariatur iusto ducimus qui harum ea, quam at repudiandae recusandae non. Quos ea illo corporis nesciunt amet.',
        price: 3799000
      },

      {
        image: 'http://placehold.it/300x300',
        product: 'Samsung Galaxy S9',
        description: 'Description Product1',
        longDesciption:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium deleniti voluptate quos, dolore, pariatur iusto ducimus qui harum ea, quam at repudiandae recusandae non. Quos ea illo corporis nesciunt amet.',
        price: 2999900
      },

      {
        image: 'http://placehold.it/300x300',
        product: 'Moto G6',
        description: 'Description Product1',
        longDesciption:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium deleniti voluptate quos, dolore, pariatur iusto ducimus qui harum ea, quam at repudiandae recusandae non. Quos ea illo corporis nesciunt amet.',
        price: 669900
      },

      {
        image: 'http://placehold.it/300x300',
        product: 'Xiaomi Redmi 5 DS',
        description: 'Description Product1',
        longDesciption:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium deleniti voluptate quos, dolore, pariatur iusto ducimus qui harum ea, quam at repudiandae recusandae non. Quos ea illo corporis nesciunt amet.',
        price: 5999000
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  pushDescription(product) {
    this.navCtrl.push(ProductDetailsPage, { product });
  }
}
