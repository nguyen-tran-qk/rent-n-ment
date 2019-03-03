import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Product,
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

  addProduct(data: FormData) {
    const setting = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post<{ message: string, file_id: number }>(this.API + '/media', data, setting);
  }

  addProductToCategory(data: { file_id: number, tag: string }) {
    const setting = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post<{ message: string, tag_id: number }>(this.API + '/tags', data, setting);
  }
}
