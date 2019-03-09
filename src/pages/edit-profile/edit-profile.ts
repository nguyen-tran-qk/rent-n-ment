import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/interface';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user: User;
  userInfo: any = {
    username: '',
    fullName: '',
    email: '',
  };
  loading = this.loadingCtrl.create({
    content: 'Saving, please wait...',
  });

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.mediaProvider.getCurrentUser().subscribe(
      (data: User) => {
        console.log(data);
        this.user = data;
        this.userInfo.username = data.username;
        this.userInfo.fullName = data.full_name;
        this.userInfo.email = data.email;
      });
  }

  change() {
    this.loading.present().catch();
    const data = {
      username: this.userInfo.username,
      full_name: this.userInfo.fullName,
      email: this.userInfo.email,
    };

    this.mediaProvider.updateUserInfo(data,
      localStorage.getItem('token')).subscribe(() => {
      setTimeout(() => {
        this.loading.dismiss().catch();
        this.navCtrl.pop().catch();

      }, 2000);
    }, (err) => {
      this.loading.dismiss().catch();
      console.log(err);
    });
  }
}


