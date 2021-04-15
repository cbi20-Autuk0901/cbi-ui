import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils/utils.service';
import { DatastoreService } from './../../../services/data-store/data-store.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certification-queue',
  templateUrl: './certification-queue.component.html',
  styleUrls: ['./certification-queue.component.scss'],
})
export class CertificationQueueComponent implements OnInit {
  userData: object;
  certifications: Array<object>;
  loading: boolean = true;
  filterOptions: Array<object>;
  filteredCertifications: Array<object>;
  selectedCert: any;

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
  }

  ngOnInit(): void {
    const payload = {
      userEmail: this.userData['userEmail'],
    };
    this.ds.getCertQueue(payload).subscribe((e) => {
      this.certifications = this.utils.addIndex(e.data);
      this.filteredCertifications = this.certifications;
      this.loading = false;
    });
  }

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
