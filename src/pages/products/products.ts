import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { ProductProvider } from '../../providers/product/product';

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
  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';
  image: string;
  product: string;
  description: string;
  price: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productProvider: ProductProvider) {
    this.productProvider.getProductByCategory(navParams.data.categoryKey).subscribe(data => {
      this.products = data.map(item => {
        const image = this.mediaFilePath + item.filename;
        const splitedDescription = item.description.split('[meta]');
        const description = splitedDescription[0];
        const priceData = JSON.parse(splitedDescription[1]);
        return {
          ...item,
          image,
          description,
          price: priceData.price
        };
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  pushDescription(product) {
    this.navCtrl.push(ProductDetailsPage, { product });
  }
}
