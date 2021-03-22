import { DatastoreService } from './../../../services/data-store/data-store.service';
import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { UtilsService } from './../../../services/utils/utils.service';

@Component({
  selector: 'app-certifications-list',
  templateUrl: './certifications-list.component.html',
  styleUrls: ['./certifications-list.component.scss']
})
export class CertificationsListComponent implements OnInit {

  userData: object;
  certifications: Array<object>;
  loading: boolean = true;
  statuses: Array<object>;

  constructor (private ds: DatastoreService, private utils: UtilsService) {
    this.userData = this.ds.getStore('userData');
  }

  ngOnInit (): void {

    const payload = {
      userEmail: this.userData['userEmail'],
    };
    this.ds.getCertifications(payload).subscribe((e) => {
      this.certifications = this.modelData(e.recentCertifications);
      this.loading = false;
    });

    this.statuses = [
      { name: 'Approved', value: 'unqualified' },
      { name: 'Qualified', value: 'qualified' },
      { name: 'New', value: 'new' },
      { name: 'Negotiation', value: 'negotiation' },
      { name: 'Renewal', value: 'renewal' },
      { name: 'Proposal', value: 'proposal' }
    ];

  }

  modelData = (data) => {
    let processedData = [];
    data.forEach((item, index) => {
      if (item.certificationStatus = "Completed") {
        const temp = {
          no: index + 1,
          certId: item.certificationId,
          certType: (this.utils.toSentenceCase(item.certificationType)),
          date: this.utils.formatDate(item.applicationDate),
          instrType: item.instrumentType,
          status: item.certificationStatus
        };
        processedData.push(temp);
      }
    });
    console.log(processedData);
    return processedData;

  };

}
