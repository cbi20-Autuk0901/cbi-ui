import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DatastoreService {
  public currentPage: Subject<string> = new Subject<string>();
  public currentFormPage: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  updateValue(key: string, value: any) {
    this[key].next(value);
  }

  getDashboard = (payload: object, name: string): Observable<any> => {
    const url = '/api/' + name;
    return this.http.post(url, payload);
  };

  getCertQueue = (headers: object): Observable<any> => {
    const url = '/api/assignCertification';
    const options = {
      headers: new HttpHeaders({
        userEmail: headers['userEmail'],
      }),
    };
    return this.http.get(url, options);
  };

  getAdminCertQueue = (headers: object): Observable<any> => {
    const url = '/api/adminCertificationQueue';
    const options = {
      headers: new HttpHeaders({
        userEmail: headers['userEmail'],
      }),
    };
    return this.http.get(url, options);
  };

  assignCertification = (payload): Observable<any> => {
    const url = '/api/assignCertification';
    return this.http.post(url, payload);
  };

  adminAssign = (payload): Observable<any> => {
    const url = '/api/adminCertificationQueue';
    return this.http.post(url, payload);
  };

  workBoard = (headers: object): Observable<any> => {
    const url = '/api/workBoard';
    const options = {
      headers: new HttpHeaders({
        userEmail: headers['userEmail'],
      }),
    };
    return this.http.get(url, options);
  };

  savePWorkSpace = (data): Observable<any> => {
    const url = '/api/workBoard';
    return this.http.post(url, data);
  };

  generateCertification = (headers: object): Observable<any> => {
    const url = '/api/generateCertificationId';
    const options = {
      headers: new HttpHeaders({
        userEmail: headers['userEmail'],
        certificationType: headers['certType'],
        instrumentType: headers['instrType'],
        certificationId: headers['certId'],
      }),
    };
    return this.http.get(url, options);
  };

  submitBondRedemption = (data: any): Observable<any> => {
    const formData = new FormData();
    const url = '/api/bondRedemption';
    Object.entries(data).forEach(([key, value]): any => {
      formData.append(key, data[key]);
    });
    return this.http.post(url, formData);
  };

  getAdminReports = (headers: object): Observable<any> => {
    const url = '/api/getAdminReports';
    const options = {
      headers: new HttpHeaders({
        userEmail: headers['userEmail'],
      }),
    };
    return this.http.get(url, options);
  };

  getAdminManagement = (headers: object): Observable<any> => {
    const url = '/api/userManagement';
    const options = {
      headers: new HttpHeaders({
        userEmail: headers['userEmail'],
      }),
    };
    return this.http.get(url, options);
  };

  getCertifications = (headers: object, type?: string): Observable<any> => {
    let url: string = '';

    switch (type) {
      case 'post': {
        url = '/api/getPreCertifications';
        break;
      }
      case 'bondRedemption': {
        url = '/api/getPostCertifications';
        break;
      }
      case 'annualReport': {
        url = '/api/submitAnnualReport';
        break;
      }
      default: {
        url = '/api/getCertifications';
        break;
      }
    }
    const options = {
      headers: new HttpHeaders({
        userEmail: headers['userEmail'],
      }),
    };
    return this.http.get(url, options);
  };

  getApprovedCertifications = (headers: object, type?: string): Observable<any> => {
    let url: string = '/api/getApprovedCertifications';

    const options = {
      headers: new HttpHeaders({
        userEmail: headers['userEmail'],
      }),
    };
    return this.http.get(url, options);
  };

  forgotPassword = (payload): Observable<any> => {
    const url = '/api/forgotPassword';
    return this.http.post(url, payload);
  };

  upload = (data: any, page: string): Observable<any> => {
    const formData = new FormData();
    const url = page === 'ar' ? '/api/assuranceReport' : '/api/signedCertificationAgreement';
    Object.entries(data).forEach(([key, value]): any => {
      formData.append(key, data[key]);
    });
    return this.http.post(url, formData);
  };

  submitAnnualReport = (payload: any): Observable<any> => {
    const formData = new FormData();
    const url = '/api/submitAnnualReport';

    formData.append('annualReport', payload['annualReport']);
    formData.append('certificationId', payload['certificationId']);
    formData.append('certificationType', payload['certificationType']);

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
        userEmail: headers['userEmail'],
        certificationId: headers['certId'],
        certificationType: headers['certType'],
      }),
    };
    return this.http.get(url, options);
  };

  removeCertification = (payload: object): Observable<any> => {
    const url = '/api/deleteCertification';
    return this.http.post(url, payload);
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

  approveCertification = (payload: object): Observable<any> => {
    const url = '/api/approveCertification';
    return this.http.post(url, payload);
  };

  adminAddUser = (payload: object): Observable<any> => {
    const url = '/api/addUser';
    return this.http.post(url, payload);
  };

  adminUpdateUser = (payload: object): Observable<any> => {
    const url = '/api/updateUser';
    return this.http.post(url, payload);
  };

  adminRemoveUser = (payload: object): Observable<any> => {
    const url = '/api/removeUser';
    return this.http.post(url, payload);
  };

  adminInviteIssuer = (payload: object): Observable<any> => {
    const url = '/api/inviteIssuer';
    return this.http.post(url, payload);
  };
}
