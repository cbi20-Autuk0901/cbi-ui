import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-climate-bond-information',
  templateUrl: './climate-bond-information.component.html',
  styleUrls: ['./climate-bond-information.component.scss'],
})
export class ClimateBondInformationComponent implements OnInit {
  @Output() currentPageEvent = new EventEmitter<object>();

  form: string;
  pageData: object = {
    showNext: false,
    showBack: false,
  };

  constructor() {}

  ngOnInit(): void {
    this.form = 'first';
    setTimeout(() => {
      this.currentPageEvent.emit(this.pageData);
    });
  }

  switchForm = (newForm: string) => {
    this.form = newForm;
    this.pageData = {
      showNext: newForm === 'second',
      showBack: false,
    };

    this.currentPageEvent.emit(this.pageData);
  };
}
