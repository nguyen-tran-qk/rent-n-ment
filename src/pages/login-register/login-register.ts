import { Component, ViewChild } from '@angular/core';
import {
  AlertController,
  NavController,
  NavParams,
  ToastController,
} from 'ionic-angular';
import {
  LoginResponse,
} from '../../interfaces/interface';
import { MediaProvider } from '../../providers/media/media';
import { UserPage } from '../user/user';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterLoginPage } from '../register-login/register-login';
import { LoadingProvider } from '../../providers/loading/loading';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { Facebook } from '@ionic-native/facebook';


/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})

export class LoginRegisterPage {
  @ViewChild('username') usernameInput;
  @ViewChild('registerForm') form: any;

  loggedIn = false;
  username: AbstractControl;

  password: AbstractControl;

  passwordtype: string = 'password';

  passeye: string = 'eye';

  userAlert = false;

  authForm: FormGroup;


  user: any = {};


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public fb: FormBuilder,
    public loadingProvider: LoadingProvider,
    public facebook: Facebook) {
    this.authForm = this.fb.group({
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
    });

    this.username = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  /*------------------
  --------------------*/

  // For Social Login

  socialLogin(isLogin) {
    if (isLogin == 'facebook') {
      this.loadingProvider.startLoading();

      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider).then(() => {
        this.loadingProvider.startLoading();
        firebase.auth().getRedirectResult().then((result) => {
          console.log('result', result);
          this.moveToHome(result.user);
          this.loadingProvider.stopLoading();
        }).catch(function (error) {
          this.loadingProvider.stopLoading();
          alert(error.message);
          console.log('error', error);
        });
        this.loadingProvider.stopLoading();
      }).catch(function (error) {
        this.loadingProvider.stopLoading();
        alert(error.message);
        console.log('error', error);
      });
      this.loadingProvider.stopLoading();
    } else if (isLogin == 'google') {
      this.loadingProvider.startLoading();
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider).then(() => {
        this.loadingProvider.startLoading();
        firebase.auth().getRedirectResult().then((result) => {
          console.log('result', result);
          this.loadingProvider.stopLoading();
          this.moveToHome(result.user);
        }).catch(function (error) {
          this.loadingProvider.stopLoading();
          alert(error.message);
          console.log('error', error);
        });
        this.loadingProvider.stopLoading();
      }).catch(function (error) {
        this.loadingProvider.stopLoading();
        alert(error.message);
        console.log('error', error);
      });
      this.loadingProvider.stopLoading();
    } else if (isLogin == 'twitter') {
      // this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
      // 	.then(res => {
      // 		 this.moveToHome(res);
      // 	})
      // 	.catch(err => console.log('err',err));
    } else if (isLogin == 'github') {
      // this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
      // 	.then(res => {
      // 		 this.moveToHome(res);
      // 	})
      // 	.catch(err => console.log('err',err));
    }

  }

  // Move to register page
  moveToRegister() {
    this.navCtrl.setRoot(RegisterLoginPage);
  }


  //Move to Home Page
  moveToHome(res) {
    console.log('res', res);
    this.navCtrl.setRoot(HomePage, {res: res});
  }

  login() {
    this.mediaProvider.login(this.user).subscribe(
      (response: LoginResponse) => {

        // console.log(response);
        this.mediaProvider.loggedIn = true;

        // save the token to localstorage
        localStorage.setItem('token', response.token);
        this.mediaProvider.user = response.user;

        localStorage.setItem('userId', response.user.user_id.toString());

        // move to the home page (use navCtrl)
        this.navCtrl.push(UserPage).catch();
      },
      error => {
        console.log(error);
      });
  }

  managePassword() {
    if (this.passwordtype == 'password') {
      this.passwordtype = 'text';
      this.passeye = 'eye-off';
    } else {
      this.passwordtype = 'password';
      this.passeye = 'eye';
    }
  }

  swapLog() {
    this.loggedIn = !this.loggedIn;
  }

}
