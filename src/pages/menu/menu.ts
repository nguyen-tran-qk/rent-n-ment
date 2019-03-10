import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';
import { AddProductPage } from '../add-product/add-product';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homepage = HomePage;
  userpage= UserPage;
  upload = AddProductPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public  mediaProvider: MediaProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
