import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-entry-page',
  templateUrl: './form-entry-page.component.html',
  styleUrls: ['./form-entry-page.component.scss'],
})
export class FormEntryPageComponent implements OnInit {
  currentForm: number;
  pageData: object;

  constructor() {
    this.currentForm = 1;
  }

  ngOnInit(): void {}

  switchForm = (type: string) => {
    if (type === 'next' && this.currentForm < 3) {
      ++this.currentForm;
    }
    if (type === 'back' && this.currentForm > 1) {
      --this.currentForm;
    }
  };

  getPageInfo = (data: object) => {
    this.pageData = data;
  };
}
