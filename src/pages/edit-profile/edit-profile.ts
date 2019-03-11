import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController } from 'ionic-angular';
import { User, UserLocation } from '../../interfaces/interface';
import { MediaProvider } from '../../providers/media/media';
import { LocationProvider } from '../../providers/location/location';
import { Geolocation } from '@ionic-native/geolocation';

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
  myLocation: UserLocation;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation,
    private locationProvider: LocationProvider,
    public toastCtrl: ToastController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    this.mediaProvider.getCurrentUser().subscribe((data: User) => {
      this.user = data;
      this.userInfo.username = data.username;
      this.userInfo.fullName = data.full_name;
      this.userInfo.email = data.email;
    });

    this.geolocation.getCurrentPosition().then((res) => {
      this.myLocation = { latitude: res.coords.latitude, longitude: res.coords.longitude };
    }).catch((error) => {
      console.log('Error getting location', error);
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

  saveLocation() {
    let data = this.locationProvider.locationsData;
    data[this.user.user_id] = { latitude: this.myLocation.latitude, longitude: this.myLocation.longitude };
    this.locationProvider.updateLocations(data).then(_ => {
      const toast = this.toastCtrl.create({
        message: 'Your location is saved and will be displayed to customers in all your products.',
        duration: 3000
      });
      toast.present();
    });
  }
}


