import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { startCase } from 'lodash-es';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  userEntry: object;
  userAddForm: FormGroup;
  enableAddUsr: boolean;
  clonedUsrs: { [s: string]: any } = {};

  constructor(
    private ds: DatastoreService,
    private utils: UtilsService,
    private fb: FormBuilder
  ) {
    this.isLoading = true;
    this.userEntry = {
      firstName: '',
      lasName: '',
      userEmail: '',
      jobTitle: '',
      location: '',
      userRole: '',
      companyName: '',
    };
    /* this.userAddForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userEmail: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      location: ['', [Validators.required]],
      userRole: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
    }); */
    this.enableAddUsr = false;
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

  onRowEditInit(tmpUsr: any) {
    this.clonedUsrs[tmpUsr.id] = { ...tmpUsr };
  }

  onRowEditSave(tmpUsr: any) {
    delete this.clonedUsrs[tmpUsr.id];
  }

  onRowEditCancel(tmpUsr: any, index: number) {
    this.usrList[index] = this.clonedUsrs[tmpUsr.id];
    delete this.clonedUsrs[tmpUsr.id];
  }

  addUser = (form) => {
    if (form.valid) {
      console.log(form.value);
    } else {
      this.utils.showMessage('error', 'Error', 'All fields are mandatory');
    }
  };
}
