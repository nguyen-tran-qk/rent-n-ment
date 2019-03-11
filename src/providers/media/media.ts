import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginResponse, Media,
  RegisterResponse,
  User,
} from '../../interfaces/interface';
import { MenuPage } from '../../pages/menu/menu';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  mediaApi = ' http://media.mw.metropolia.fi/wbma/';

  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';


  loggedIn = false;

  user: User = null;


  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getCurrentUser() {
    const setting = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.get<User>(this.mediaApi + 'users/user', setting);
  }

  getSingleMedia(id) {
    return this.http.get<Media>(this.mediaApi + 'media/' + id);
  }

  getFilesByTag(tag) {
    // single file
    return this.http.get<Media[]>(this.mediaApi + 'tags/' + tag);
  }

  checkUsers(username) {
    return this.http.get(this.mediaApi + 'users/username/' + username);
  }

  register(userData: User) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-type': 'application/json',
        },
      ),
    };
    return this.http.post<RegisterResponse>(this.mediaApi + 'users',
      userData, httpOptions);
  }


  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-type': 'application/json',
        },
      ),
    };
    return this.http.post<LoginResponse>(this.mediaApi + 'login', user,
      httpOptions);
  }

  getFilesByUser(token) {
    const setting = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.get<Media[]>(this.mediaApi + 'media/user', setting);
  }

  delete(id, token) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.delete(this.mediaApi + 'media/' + id, settings);
  }

  modify(data, id, token) {
    const setting = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.put(this.mediaApi + 'media/' + id, data, setting);
  }

  updateUserInfo(data, token) {
    const setting = {
      headers: new HttpHeaders().set('x-access-token', token),
    };
    return this.http.put(this.mediaApi + 'users/', data, setting);
  }

  getUserById(user_id: number) {
    const setting = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.get<User>(this.mediaApi + 'users/' + user_id, setting);
  }

  swapLog(){
    this.loggedIn = !this.loggedIn;
  }
  uploadAMediaFile(data: any) {
    const httpOptions = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post<LoginResponse>(this.mediaApi + 'media', data, httpOptions);
  }

  postAtag(data){
    const httpOptions = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post(this.mediaApi + 'tags',data , httpOptions);
  }

}
