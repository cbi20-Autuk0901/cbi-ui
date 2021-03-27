import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { UtilsService } from './../../../services/utils/utils.service';

@Component({
  selector: 'app-pi-agreement',
  templateUrl: './pi-agreement.component.html',
  styleUrls: ['./pi-agreement.component.scss']
})
export class PiAgreementComponent implements OnInit, OnChanges {

  @Input() userInput: object;

  constructor (private utils: UtilsService) { }

  ngOnInit (): void {
  }

  ngOnChanges () {
    const applicationDate = this.userInput['applicationDate'];
    if (applicationDate) {
      this.userInput['applicationDate'] = this.utils.formatDate(applicationDate);
    }

  }

}
