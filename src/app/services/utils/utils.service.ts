import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private ms: MessageService) {}

  setStore = (key, value) => {
    const lsData = JSON.stringify(value);
    localStorage.setItem(key, lsData);
  };

  getStore = (key) => {
    const lsData = localStorage.getItem(key);
    const data = JSON.parse(lsData);
    return data;
  };

  toTitleCase = (str) => {
    if (str) {
      return str
        .toLowerCase()
        .split(' ')
        .map(function (word) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    }
  };

  toSentenceCase = (str) => {
    if (str) {
      return str.replace(/(^[a-z])|(\s+[a-z])/g, (txt) => txt.toUpperCase());
    }
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

  showMessage = (severity, title, msg) => {
    this.ms.add({
      key: 'bc',
      severity: severity,
      summary: title,
      detail: msg,
    });
  };
}
