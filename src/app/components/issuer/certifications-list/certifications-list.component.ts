import { DatastoreService } from '../../../services/data-store/data-store.service';
import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { UtilsService } from '../../../services/utils/utils.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-certifications-list',
  templateUrl: './certifications-list.component.html',
  styleUrls: ['./certifications-list.component.scss'],
})
export class CertificationsListComponent implements OnInit {
  userData: object;
  certifications: Array<object>;
  loading: boolean = true;
  certType: string;

  constructor(
    private ds: DatastoreService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {
    this.userData = this.utils.getStore('userData');
  }

  ngOnInit(): void {
    const payload = {
      userEmail: this.userData['userEmail'],
    };

    this.route.queryParams.subscribe((params) => {
      this.certType = params['certType'];
      this.ds.getCertifications(payload, this.certType).subscribe((e) => {
        this.certifications = this.modelData(e.recentCertifications);
        this.loading = false;
      });
    });
  }

  modelData = (data) => {
    let processedData = [];
    let index = 0;
    data.forEach((item) => {
      ++index;
      const temp = {
        no: index,
        certId: item.certificationId,
        name: item.uniqueName,
        certType: item.certificationType,
        date: this.utils.formatDate(item.applicationDate),
        instrType: item.instrumentType,
        status: item.certificationStatus,
      };
      processedData.push(temp);
    });
    return processedData;
  };
}
