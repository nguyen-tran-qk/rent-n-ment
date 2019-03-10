import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Events } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { Product, User, ProductComment } from '../../interfaces/interface';
import { Observable } from 'rxjs';

/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  product: Product;
  rating = 0;
  myRating = 0;
  isRated = false;
  productOwner: Observable<User>;
  comments: ProductComment[] = [];
  myComment: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public events: Events,
    public productProvider: ProductProvider,
    public toastCtrl: ToastController
  ) {
    this.product = navParams.data.product;
  }

  ngOnInit() {
    // subscribe to rating change event
    this.events.subscribe('star-rating:changed', this.rateProduct);

    // get product's rating
    this.getProductRatings();

    // get product owner's info
    this.productOwner = this.mediaProvider.getUserById(this.product.user_id);

    // get product's comments
    this.getProductComments();
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
  }

  getProductRatings() {
    this.productProvider.getRatingsByProduct(this.product.file_id).subscribe(data => {
      if (data && data.length) {
        this.rating = Math.round(data.reduce((prev, curr) => {
          if (localStorage.getItem('userId') && curr.user_id.toString() === localStorage.getItem('userId')) {
            this.myRating = curr.rating;
            this.isRated = true;
          }
          return prev + curr.rating;
        }, 0) / data.length);
      }
    });
  }

  getProductComments() {
    this.comments = [];
    this.productProvider.getProductComments(this.product.file_id).subscribe(data => {
      data.map(item => {
        this.mediaProvider.getUserById(item.user_id).subscribe(user => {
          this.comments.push(Object.assign(item, user));
        });
      });
    });
  }

  rateProduct = (rating: number) => {
    this.productProvider.rateProduct({
      file_id: this.product.file_id,
      rating
    }).subscribe(data => {
      if (data.rating_id) {
        this.myRating = rating;
        this.isRated = true;
      }
    }, error => {
      if (error.error.reason && error.error.reason.includes('ER_DUP_ENTRY')) {
        const toast = this.toastCtrl.create({
          message: 'Sorry, you already rated this product.',
          duration: 3000
        });
        toast.present();
      }
    });
  }

  addComment() {
    if (this.myComment && this.myComment.length) {
      this.productProvider.addProductComment({ file_id: this.product.file_id, comment: this.myComment }).subscribe(data => {
        if (data.comment_id) {
          this.myComment = '';
          this.getProductComments();
        }
      });
    }
  }

  visitUsersPage() {
   //visits the respective users page who uploaded the product
  }
}
