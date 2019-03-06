import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interfaces/interface';

/**
 * Generated class for the ModifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-modify',
  templateUrl: 'modify.html',
})
export class ModifyPage {
  file: Media;
  fileInfo: any = {
    title: '',
    description: '',
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
    console.log('ionViewDidLoad ModifyPage');
    this.mediaProvider.getSingleMedia(this.navParams.get('fileId')).subscribe(
      (file: Media) => {
        this.file = file;
        this.fileInfo.title = file.title;
        this.fileInfo.description = file.description;
      });
  }

  save() {
    this.loading.present().catch();
    const data = {
      title: this.fileInfo.title,
      description: this.fileInfo.description,
    };

    this.mediaProvider.modify(data, this.file.file_id,
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
