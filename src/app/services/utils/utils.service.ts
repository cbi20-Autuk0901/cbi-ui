import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor () { }

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
          name: i,
          value: i
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
