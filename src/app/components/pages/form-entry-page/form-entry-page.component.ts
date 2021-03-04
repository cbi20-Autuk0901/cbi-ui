import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-entry-page',
  templateUrl: './form-entry-page.component.html',
  styleUrls: ['./form-entry-page.component.scss'],
})
export class FormEntryPageComponent implements OnInit {
  page: string = '1';
  showNext: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  changePage = (pageNo: string) => {
    this.page = pageNo;
    this.showNext = pageNo !== '1';
  };
}
