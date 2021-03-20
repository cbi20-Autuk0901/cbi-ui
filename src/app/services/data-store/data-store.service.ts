import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Datastore } from '../../models/data-store.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  public currentPage: Subject<string> = new Subject<string>();

  constructor (private http: HttpClient) { }

  updateValue (key: string, value: any) {
    this.currentPage.next(value);
  }

  getDashboard = (payload: object): Observable<any> => {
    const url = '/api/issuerDashboard';
    return this.http.post(url, payload);
  };

  upload = (data: any): Observable<any> => {
    const formData = new FormData();
    const url = '/api/assuranceReport';
    Object.entries(data).forEach(([key, value]): any => {
      formData.append(key, data[key]);
    });
    return this.http.post(url, formData);
  };

  formSave = (data: any, page: string): Observable<any> => {
    let url = this.getPageUrl(page);
    return this.http.post(url, data);
  };

  formResume = (page: string, headers: object): Observable<any> => {
    const url = this.getPageUrl(page);
    const options = {
      headers: new HttpHeaders({
        'userEmail': headers['userEmail'],
        'certificationId': headers['certId'],
        'certificationType': headers['certType']
      })
    };
    return this.http.get(url, options);
  };

  getPageUrl = (page): string => {
    let url = '';
    switch (page) {
      case 'cbiForm':
        url = '/api/climateBondInformation';
        break;
      case 'cbiFormContd':
        url = '/api/climateBondInformationContd';
        break;
      case 'caForm':
        url = '/api/certificateAgreement';
        break;
      default:
        url = '';
        break;
    }

    return url;
  };

  submitApplication = (payload: object): Observable<any> => {
    const url = '/api/submitApplication';
    return this.http.post(url, payload);
  };

  setStore = (key, value) => {
    const lsData = JSON.stringify(value);
    localStorage.setItem(key, lsData);
  };

  getStore = (key) => {
    const lsData = localStorage.getItem(key);
    const data = JSON.parse(lsData);
    return data;
  };
}
