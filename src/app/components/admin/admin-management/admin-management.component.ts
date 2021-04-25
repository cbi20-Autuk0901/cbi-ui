import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { startCase } from 'lodash-es';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss'],
})
export class AdminManagementComponent implements OnInit {
  pgData: object;
  usrStats: object;
  isLoading: boolean;
  currentView: string;
  usrList: Array<object>;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    const headers: object = this.utils.getStore('userData');
    this.ds.getAdminManagement(headers).subscribe((res) => {
      this.pgData = res;
      this.usrStats = res['userStats'];
      this.changeView('admin');
      this.isLoading = false;
    });
  }

  changeView = (name) => {
    let tempList = [];
    this.currentView = name;

    if (name === 'admin') tempList = this.pgData['admins'];
    if (name === 'reviewer') tempList = this.pgData['reviewers'];
    if (name === 'issuer') {
      tempList = this.pgData['issuers'].map((e) => {
        e.userRole = startCase(e.userRole);
        return e;
      });
    }

    this.usrList = this.utils.addIndex(tempList);
  };
}
