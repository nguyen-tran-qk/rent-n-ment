import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginResponse, Media,
  RegisterResponse,
  User,
} from '../../interfaces/interface';

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
}
