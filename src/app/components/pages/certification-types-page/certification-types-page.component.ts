import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatastoreService } from 'src/app/services/data-store/data-store.service';
@Component({
  selector: 'app-certification-types-page',
  templateUrl: './certification-types-page.component.html',
  styleUrls: ['./certification-types-page.component.scss'],
})
export class CertificationTypesPageComponent implements OnInit {
  certificationType: string = '';
  userSelection: object = {
    certificationType: '',
    instrumentType: '',
  };
  constructor(private route: ActivatedRoute, private ds: DatastoreService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.certificationType = params['select'];
      this.ds.setStore('certificationType', this.certificationType);
    });
  }
}
