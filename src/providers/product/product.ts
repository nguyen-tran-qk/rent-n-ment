import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Product,
  ProductRating,
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
  setting: {};

  constructor(public http: HttpClient) {
    console.log('Hello ProductProvider Provider');
    this.setting = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
  }

  getProductByCategory(categoryName: string) {
    return this.http.get<Product[]>(this.API + '/tags/' + categoryName);
  }

  addProduct(data: FormData) {
    return this.http.post<{ message: string, file_id: number }>(this.API + '/media', data, this.setting);
  }

  addProductToCategory(data: { file_id: number, tag: string }) {
    return this.http.post<{ message: string, tag_id: number }>(this.API + '/tags', data, this.setting);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.API + '/media/' + id, this.setting);
  }

  rateProduct(data: {file_id: number, rating: number}) {
    return this.http.post<{message: string, rating_id: number, reason?: string}>(this.API + '/ratings', data, this.setting);
  }

  getRatingsByProduct(file_id: number) {
    return this.http.get<ProductRating[]>(this.API + '/ratings/file/' + file_id, this.setting);
  }
}
