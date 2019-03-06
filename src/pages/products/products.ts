import { Component } from '@angular/core';
import { NavController, NavParams, Segment } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { ProductProvider } from '../../providers/product/product';
import { Product } from '../../interfaces/interface';

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
  products: Product[] = [];
  allProducts: Product[] = [];
  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';
  image: string;
  product: string;
  description: string;
  price: number;
  purpose = 'all';

  constructor(public navCtrl: NavController, public navParams: NavParams, private productProvider: ProductProvider) {
    this.productProvider.getProductByCategory(navParams.data.categoryKey).subscribe(data => {
      this.products = data.map(item => {
        const image = this.mediaFilePath + item.filename;
        const splitedDescription = item.description.split('[meta]');
        const description = splitedDescription[0];
        const metaData = JSON.parse(splitedDescription[1]);
        return {
          ...item,
          image,
          description,
          price: metaData.price,
          status: metaData.status
        };
      });
      this.allProducts = [...this.products];
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  pushDescription(product) {
    this.navCtrl.push(ProductDetailsPage, { product });
  }

  filterByPurpose($event: Segment) {
    this.purpose = $event.value;
    if (this.purpose === 'all') {
      this.products = [...this.allProducts];
    } else {
      this.productProvider.getProductByCategory(this.purpose).subscribe(data => {
        this.products = this.allProducts.filter(item => {
          return data.find(product => product.file_id === item.file_id);
        });
      });
    }
  }
}
