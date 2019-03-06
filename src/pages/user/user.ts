import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs';
import { Media } from '../../interfaces/interface';
import { AddProductPage } from '../add-product/add-product';
import { ModifyPage } from '../modify/modify';

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
    public mediaProvider: MediaProvider, public alertCtrl: AlertController) {
  }

  getMyFiles() {
    this.picArray = this.mediaProvider.getFilesByUser(
      localStorage.getItem('token'));
  }

  ionViewDidEnter() {
    this.getMyFiles();
  }

  doDelete(id) {
    this.mediaProvider.delete(id, localStorage.getItem('token')).
      subscribe(response => {
        this.getMyFiles();
      });
  }

  deleteAFile(id) {
    const alert = this.alertCtrl.create({
      title: 'Notice!',
      subTitle: 'Do you really want to delete it?',
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
    this.navCtrl.push(AddProductPage).catch();
  }

  logout() {
    localStorage.clear();
    this.mediaProvider.loggedIn = false;
    this.navCtrl.push(HomePage).catch();
  }
}
