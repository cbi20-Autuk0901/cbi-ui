import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-certification-types-page',
  templateUrl: './certification-types-page.component.html',
  styleUrls: ['./certification-types-page.component.scss'],
})
export class CertTypesPageComponent implements OnInit {
  certType: string = '';
  userSelection: object = {
    certType: '',
    instrType: '',
  };
  appOpen: boolean;

  constructor(private route: ActivatedRoute, private ds: DatastoreService, private utils: UtilsService) {
    this.appOpen = this.utils.getStore('applicationOpen');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.certType = params['certType'];
    });
  }
}
