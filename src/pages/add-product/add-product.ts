import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PRODUCT_STATUS, categories } from '../../constants';
import { ProductProvider } from '../../providers/product/product';
import { UserPage } from '../user/user';
import { MenuPage } from '../menu/menu';
import { MediaProvider } from '../../providers/media/media';

class AddProductForm {
  constructor(
    public productName = '',
    public price = '',
    public description = '',
    public category = '',
    public purpose = '',
    public status = PRODUCT_STATUS.AVAILABLE,
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
  productImage: File = null;
  productImagePreview: string;
  categories;
  selectOptions = {
    title: 'Select a category'
  };
  purposeSelectOptions = {
    title: 'This product is for...'
  };
  statusSelectOptions = {
    title: 'Product status'
  };
  editMode = false;
  categoryToEdit;
  purposeToEdit;

  constructor(public navCtrl: NavController, public navParams: NavParams, private productProvider: ProductProvider, private mediaProvider: MediaProvider) {
    if (navParams.data.fileId) {
      this.editMode = true;
      this.mediaProvider.getSingleMedia(navParams.data.fileId).subscribe(data => {
        const image = this.mediaProvider.mediaFilePath + data.filename;
        const splitedDescription = data.description.split('[meta]');
        const description = splitedDescription[0];
        const metaData = JSON.parse(splitedDescription[1]);
        this.productProvider.getTagsByProduct(navParams.data.fileId).subscribe(tagData => {
          this.categoryToEdit = tagData.find(item => item.tag.includes('rentnmend.categories'));
          this.purposeToEdit = tagData.find(item => item.tag.includes('rentnmend.purpose'));
          this.model = {
            productName: data.title,
            description,
            price: metaData.price,
            status: metaData.status,
            category: this.categoryToEdit.tag,
            purpose: this.purposeToEdit.tag
          };
          this.productImagePreview = image;
        });
      });
    }
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

  addTagsForProduct(file_id: number) {
    this.productProvider.tagProduct(file_id).subscribe(data => {
      if (data.tag_id) {
        const postData = {
          file_id: file_id,
          tag: this.model.category
        };
        this.productProvider.addProductToCategory(postData).subscribe(result => {
          if (result.tag_id) {
            const purposeTagData = {
              file_id: file_id,
              tag: this.model.purpose
            };
            this.productProvider.addProductToCategory(purposeTagData).subscribe(res => {
              if (res.tag_id) {
                this.navCtrl.parent.select(2);
              }
            });
          }
        });
      }
    });
  }

  addProduct() {
    const formData = new FormData();
    formData.append('title', this.model.productName);
    formData.append('description', this.model.description + '[meta]' + JSON.stringify({ price: this.model.price, status: parseInt(this.model.status.toString()) }));
    formData.append('file', this.productImage);
    this.productProvider.addProduct(formData).subscribe((data) => {
      if (data.file_id) {
        this.addTagsForProduct(data.file_id);
      }
    });
  }

  submit() {
    if (this.form.valid) {
      if (!this.editMode && this.productImage) {
        this.addProduct();
      } else if (this.editMode && this.productImagePreview) {
        if (this.productImage) {
          this.mediaProvider.delete(this.navParams.data.fileId, localStorage.getItem('token')).subscribe(_ => {
            this.addProduct();
          });
        } else {
          const data = {
            title: this.model.productName,
            description: this.model.description + '[meta]' + JSON.stringify({ price: this.model.price, status: parseInt(this.model.status.toString()) })
          };
          this.productProvider.updateProduct(this.navParams.data.fileId, data).subscribe(_ => {
            this.navCtrl.parent.select(2);
          });
        }
      }
    }
  }
}
