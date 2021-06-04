import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Template } from 'src/app/models/LSLABCENTER/Template';

@Injectable({
   providedIn: 'root'
})
export class TemplateService {

   url = environment.api_lslabcenter + 'template/';
   options = {headers: null};

   constructor(private http: HttpClient, private router: Router) {
      this.options.headers = new HttpHeaders({'api_token': sessionStorage.getItem('api_token')});
   }

   get(id?: number): Promise<any> {
      if (typeof id === 'undefined') {
         return this.http.get(this.url, this.options).toPromise()
         .then( r => {
            return r;
         }).catch( error => { this.handledError(error);  });
      }
      return this.http.get(this.url + '?id=' + id.toString(), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   get_by_sample_description(sample_description: String, laboratory_id: number): Promise<any> {
      return this.http.get(this.url + 'by_sample_description?laboratory_id=' + laboratory_id.toString() + '&sample_description=' + sample_description, this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   get_by_laboratory_id(laboratory_id: number): Promise<any> {
      return this.http.get(this.url + 'by_laboratory_id?laboratory_id=' + laboratory_id.toString(), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   get_paginate(size: number, page: number, laboratory_id: number): Promise<any> {
      return this.http.get(this.url + 'paginate?size=' + size.toString() + '&laboratory_id=' + laboratory_id.toString() + '&page=' + page.toString(), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error);  });
   }

   delete(id: number): Promise<any> {
      return this.http.delete(this.url + '?id=' + id.toString(), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   getBackUp(): Promise<any> {
      return this.http.get(this.url + 'backup', this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   post(template: Template): Promise<any> {
      return this.http.post(this.url, JSON.stringify(template), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   put(template: Template): Promise<any> {
      return this.http.put(this.url, JSON.stringify(template), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   masiveLoad(data: any[]): Promise<any> {
      return this.http.post(this.url + 'masive_load', JSON.stringify({data: data}), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   download(html: String, title: String, orientation: String, qr?: Boolean, qr_content?: String, params?: any): Promise<any> {
      let data = null;
      if(typeof qr != 'undefined') {
         if(typeof params != 'undefined') {
            data = {html: html, orientation: orientation, title: title, params: params, qr: qr, qr_content: qr_content};
         } else {
            data = {html: html, orientation: orientation, title: title, qr: qr, qr_content: qr_content};
         }
      } else {
         if(typeof params != 'undefined') {
            data = {html: html, orientation: orientation, title: title, params: params};
         } else {
            data = {html: html, orientation: orientation, title: title};   
         }
         
      }
      return this.http.post(this.url + 'download', JSON.stringify(data), this.options).toPromise()
      .then( r => {
         return r;
      }).catch( error => { this.handledError(error); });
   }

   handledError(error: any) {
      console.log(error);
      sessionStorage.clear();
      this.router.navigate(['/login']);
   }
}