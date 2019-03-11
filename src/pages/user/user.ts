import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs';
import { Media } from '../../interfaces/interface';
import { AddProductPage } from '../add-product/add-product';
import { ModifyPage } from '../modify/modify';
import { ProductProvider } from '../../providers/product/product';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  picArray: Observable<Media[]>;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider, public alertCtrl: AlertController,
    public productProvider: ProductProvider) {
  }

  getMyFiles() {
    this.picArray = this.mediaProvider.getFilesByUser(
      localStorage.getItem('token'));
  }

  ionViewDidEnter() {
    this.getMyFiles();
  }

  doDelete(id) {
    this.productProvider.deleteProduct(id)
    .subscribe(() => {
      this.getMyFiles();
    });
  }

  deleteProduct(id) {
    const alert = this.alertCtrl.create({
      title: 'Notice!',
      subTitle: 'Do you really want to delete this product?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.doDelete(id);
          },
        },
        'Cancel'],
    });
    alert.present().catch();
  }

  showFile(file_id) {
    return;
  }

  modifyFile(id) {
    this.navCtrl.push(ModifyPage, { fileId: id }).catch();

  }

  openAddProductPage() {
    this.navCtrl.parent.select(1);
  }

  logout() {
    localStorage.clear();
    this.mediaProvider.loggedIn = false;
    this.mediaProvider.user = null;
    location.reload();
  }

  goEditProfile(){
    this.navCtrl.push(EditProfilePage).catch();
  }
}
