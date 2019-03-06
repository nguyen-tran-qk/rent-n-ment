import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PRODUCT_STATUS, categories } from '../../constants';
import { ProductProvider } from '../../providers/product/product';
import { UserPage } from '../user/user';

class AddProductForm {
  constructor(
    public productName = '',
    public price = '',
    public description = '',
    public category = '',
    public purpose = '',
  ) {}
}

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  model: AddProductForm = new AddProductForm();
  @ViewChild('f') form: any;
  productImage: File;
  productImagePreview: string;
  categories;
  selectOptions = {
    title: 'Select a category'
  };
  purposeSelectOptions = {
    title: 'This product is for...'
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private productProvider: ProductProvider) {
    console.log(this.categories);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
    this.categories = categories;
  }

  browseImage() {
    (document.querySelector('#imageInput') as HTMLInputElement).click();
  }

  getImage($event) {
    if ($event.target && $event.target.files && $event.target.files[0]) {
      this.productImage = $event.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.productImagePreview = (evt.target as any).result;
      };
      reader.readAsDataURL(this.productImage);
    }
  }

  addProduct() {
    if (this.productImage && this.form.valid) {
      const formData = new FormData();
      formData.append('title', this.model.productName);
      formData.append('description', this.model.description + '[meta]' + JSON.stringify({ price: this.model.price, status: PRODUCT_STATUS.AVAILABLE }));
      formData.append('file', this.productImage);
      this.productProvider.addProduct(formData).subscribe((data) => {
        if (data.file_id) {
          const postData = {
            file_id: data.file_id,
            tag: this.model.category
          };
          this.productProvider.addProductToCategory(postData).subscribe(result => {
            if (result.tag_id) {
              const purposeTagData = {
                file_id: data.file_id,
                tag: this.model.purpose
              };
              this.productProvider.addProductToCategory(purposeTagData).subscribe(res => {
                if (res.tag_id) {
                  this.navCtrl.setRoot(UserPage);
                }
              });
            }
          });
        }
      });
    }
  }
}
