import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  loading: boolean = true;
  filterOptions: Array<object>;
  filteredCertifications: Array<object>;
  selectedCert: any;
  dummyRev: Array<string>;

  constructor(
    private ds: DatastoreService,
    private utils: UtilsService,
    private router: Router
  ) {
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
    this.dummyRev = [
      'Naveen@vigameq.com',
      'Naveen@gmail.com',
      'Naveen@outlook.com',
    ];
  }

  ngOnInit(): void {
    const payload = {
      userEmail: this.userData['userEmail'],
    };
    this.ds.getAdminCertQueue(payload).subscribe((e) => {
      this.certifications = this.utils.addIndex(e.data);
      this.filteredCertifications = this.certifications;
      this.loading = false;
    });
  }

  filterRev = (event) => {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.dummyRev.length; i++) {
      let rev = this.dummyRev[i];
      if (rev.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(rev);
      }
    }

    this.dummyRev = filtered;
  };

  assignCert = (selCert, type) => {
    const payload = {
      userEmail: this.userData['userEmail'],
      certificationId: selCert['certificationId'],
      certificationType: selCert['certificationType'],
    };
    this.ds.assignCertification(payload).subscribe((e) => {
      if (type === 'asn') {
        this.certifications = this.utils.addIndex(e.data);
        this.filteredCertifications = this.certifications;
        this.selectedCert = null;
      } else {
        this.router.navigateByUrl('work-board');
      }
    });
  };

  filter = (event) => {
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
