import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from './../../../services/utils/utils.service';

@Component({
  selector: 'app-pi-agreement',
  templateUrl: './pi-agreement.component.html',
  styleUrls: ['./pi-agreement.component.scss']
})
export class PiAgreementComponent implements OnInit {

  @Input() userInput: object;

  constructor (private utils: UtilsService) { }

  ngOnInit (): void {
  }

}
