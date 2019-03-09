import { Component, ViewChild } from '@angular/core';
import {
   AlertController,
   NavController,
   NavParams,
   ToastController,
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoadingProvider } from '../../providers/loading/loading';
import { LoginRegisterPage } from '../login-register/login-register';
import {
  LoginResponse,
  RegisterResponse,
  UserExists,
} from '../../interfaces/interface';
import { MediaProvider } from '../../providers/media/media';
import { UserPage } from '../user/user';

/**
 * Generated class for the RegisterLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register-login',
  templateUrl: 'register-login.html',
})
export class RegisterLoginPage {
  @ViewChild('username') usernameInput;
  @ViewChild('registerForm') form: any;

  user: any = {};

  userAlert = false;

  confirmPassword = '';


  authForm : FormGroup;
  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  cnfpass: AbstractControl;
  passwordtype:string='password';
  cnfpasswordtype:string='password';
  cnfpasseye:string='eye';
  passeye:string ='eye';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public fb: FormBuilder,
              public mediaProvider: MediaProvider,
              public loadingProvider: LoadingProvider,
              public alertCtrl: AlertController) {

    this.authForm = this.fb.group({
      'username' : [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'cnfpass': [null, Validators.compose([Validators.required])]
    }
    );

    this.username = this.authForm.controls['username'];
    this.email = this.authForm.controls['email'];
    this.password = this.authForm.controls['password'];
    this.cnfpass = this.authForm.controls['cnfpass'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterLoginPage');
  }

  moveToLogin(){
    this.navCtrl.setRoot(LoginRegisterPage);
  }

  showAlert(message) {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK'],
    });
    alert.present().catch();
  }

  managePassword() {
    if(this.passwordtype == 'password'){
      this.passwordtype='text';
      this.passeye='eye-off';
    }else{
      this.passwordtype='password';
      this.passeye = 'eye';
    }
  }
  managecnfPassword() {
    if(this.cnfpasswordtype == 'password'){
      this.cnfpasswordtype='text';
      this.cnfpasseye='eye-off';
    }else{
      this.cnfpasswordtype='password';
      this.cnfpasseye = 'eye';
    }
  }

  passwordCheck() {
    console.log(this.user.password);
    console.log(this.confirmPassword);
    if (this.user.password !== this.confirmPassword) {
      this.showAlert('Password do not match');
      return;

    }
  }


  checkUserExists() {
    this.mediaProvider.checkUsers(this.user.username).
      subscribe((data: UserExists) => {
        console.log(data.available);
        if (!data.available) {
          this.userAlert = true;
          this.usernameInput.clearInput = true;
        } else {
          this.userAlert = false;
        }
      });

  }


  register() {
    this.mediaProvider.register(this.user).subscribe(
      (data: RegisterResponse) => {
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
        this.form.reset();
      }, error => {
        console.log(error);
        this.showAlert(error.error.message);
      },
    );

  }


}
