import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginResponse, Media,
  Product,
  RegisterResponse,
  User,
} from '../../interfaces/interface';

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {

  API = ' http://media.mw.metropolia.fi/wbma';

  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(public http: HttpClient) {
    console.log('Hello ProductProvider Provider');
  }

  getProductByCategory(categoryName: string) {
    return this.http.get<Product[]>(this.API + '/tags/' + categoryName);
  }

}
