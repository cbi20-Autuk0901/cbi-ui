import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor () { }

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
      return str.toLowerCase().split(' ').map(function (word) {
        return (word.charAt(0).toUpperCase() + word.slice(1));
      }).join(' ');
    }
  };

  toSentenceCase = (str) => {
    if (str) {
      return str.replace(/(^[a-z])|(\s+[a-z])/g, (txt) =>
        txt.toUpperCase()
      );
    };
  };

  generateYearList = (start: number, end: number) => {
    if (start && end) {
      let yearsList = [];
      for (let i = start; i <= end; i++) {
        const item = {
          name: i.toString(),
          value: i.toString()
        };
        yearsList.push(item);
      }
      return yearsList;
    }
  };

  formatDate = (date) => {
    if (date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;

      return [day, month, year].join('-');
    }
  };
}
