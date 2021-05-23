import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import { isString } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private ms: MessageService) {}

  setStore = (key, value) => {
    const encData = this.encrypt(value, '10c@1 st0r@g3 D@t@');
    localStorage.setItem(key, encData);
  };

  getStore = (key) => {
    const lsData = localStorage.getItem(key);
    return this.decrypt(lsData, '10c@1 st0r@g3 D@t@');
  };

  encrypt = (data, encKey) => {
    const formatData = JSON.stringify({
      data,
    });
    return AES.encrypt(formatData, encKey).toString();
  };

  decrypt = (data, encKey) => {
    let orgData;
    if (data) {
      const deData = AES.decrypt(data, encKey).toString(Utf8);
      orgData = JSON.parse(deData).data;
    }

    return orgData;
  };

  generateYearList = (start: number, end: number) => {
    if (start && end) {
      let yearsList = [];
      for (let i = start; i <= end; i++) {
        const item = {
          name: i.toString(),
          value: i.toString(),
        };
        yearsList.push(item);
      }
      return yearsList;
    }
  };

  addIndex = (list: Array<object>) => {
    return list.map((e, index) => {
      let fVal = { ...e };
      fVal['no'] = index + 1;
      return fVal;
    });
  };

  showMessage = (position, severity, title, msg) => {
    this.ms.clear();
    this.ms.add({
      key: position,
      severity: severity,
      summary: title,
      detail: msg,
    });
  };
  clearMessage = () => {
    this.ms.clear();
  };
}
