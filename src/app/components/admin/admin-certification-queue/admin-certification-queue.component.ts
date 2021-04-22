import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-admin-certification-queue',
  templateUrl: './admin-certification-queue.component.html',
  styleUrls: ['./admin-certification-queue.component.scss'],
})
export class AdminCertificationQueueComponent implements OnInit {
  userData: object;
  certifications: Array<object>;
  filterOptions: Array<object>;
  filteredCertifications: Array<object>;
  selectedCert: any;
  reviewerList: Array<string>;
  apiData: object;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.userData = this.utils.getStore('userData');
    this.filterOptions = [
      { name: 'All', value: '' },
      { name: 'Last 24 Hours', value: '1 days' },
      {
        name: '3 Days',
        value: '3 Days',
      },
      { name: 'Last Week', value: '7 Days' },
    ];
  }

  ngOnInit(): void {
    const payload = {
      userEmail: this.userData['userEmail'],
    };
    this.ds.getAdminCertQueue(payload).subscribe((response) => {
      this.apiData = response;
      this.certifications = this.utils.addIndex(this.apiData['data']);
      this.filteredCertifications = this.certifications;
    });
  }

  filterRev = (event) => {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.apiData['reviewerEmail'].length; i++) {
      let rev = this.apiData['reviewerEmail'][i];
      if (rev.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        filtered.push(rev);
      }
    }

    this.reviewerList = filtered;
  };

  assignCert = (selCert, reviewer) => {
    const payload = {
      userEmail: this.userData['userEmail'],
      certificationId: selCert['certificationId'],
      certificationType: selCert['certificationType'],
      reviewerEmail: reviewer,
    };
    this.ds.adminAssign(payload).subscribe((response) => {
      this.apiData = response;
      this.certifications = this.utils.addIndex(this.apiData['data']);
      this.filteredCertifications = this.certifications;
    });
  };

  filterbyDate = (event) => {
    if (event) {
      const mOpt = event.split(' ');
      const refDate = moment().subtract(mOpt[0], mOpt[1]);

      const tempD = this.certifications.filter((e) => {
        const frtDate = moment(e['applicationDate']);
        return e['applicationDate'] && frtDate.isAfter(refDate);
      });

      this.filteredCertifications = this.utils.addIndex(tempD);
    } else {
      this.filteredCertifications = this.certifications;
    }
  };
}
