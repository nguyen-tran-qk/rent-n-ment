import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Product,
  ProductRating,
  ProductComment
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
    if (localStorage.getItem('token')) {
      this.setting = {
        headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
      };
    }
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

  addProductComment(data: {file_id: number, comment: string}) {
    return this.http.post<{message: string, comment_id: number}>(this.API + '/comments', data, this.setting);
  }

  getProductComments(file_id: number) {
    return this.http.get<ProductComment[]>(this.API + '/comments/file/' + file_id, this.setting);
  }

  getTagsByProduct(file_id: number) {
    return this.http.get<{tag_id: number, file_id: number, tag: string}[]>(this.API + '/tags/file/' + file_id, this.setting);
  }

  updateProduct(file_id: number, data?: { title: string, description: string }) {
    return this.http.put<{message: string}>(this.API + '/media/' + file_id, data || {}, this.setting);
  }

  deleteTag(tag_id: number) {
    return this.http.delete<{message: string}>(this.API + '/tags/' + tag_id, this.setting);
  }
}
