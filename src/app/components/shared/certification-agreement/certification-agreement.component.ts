import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-certification-agreement',
  templateUrl: './certification-agreement.component.html',
  styleUrls: ['./certification-agreement.component.scss'],
})
export class CertificationAgreementComponent implements OnInit {
  pageData: object = {
    showNext: true,
    showBack: true,
  };
  @Output() currentPageEvent = new EventEmitter<object>();
  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.currentPageEvent.emit(this.pageData);
    });
  }
}
