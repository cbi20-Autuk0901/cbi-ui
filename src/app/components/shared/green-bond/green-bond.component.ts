import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-green-bond',
  templateUrl: './green-bond.component.html',
  styleUrls: ['./green-bond.component.scss'],
})
export class GreenBondComponent implements OnInit {
  pageData: object = {
    showNext: false,
    showBack: true,
    showSubmit: true,
  };
  @Output() currentPageEvent = new EventEmitter<object>();

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.currentPageEvent.emit(this.pageData);
    });
  }
}
