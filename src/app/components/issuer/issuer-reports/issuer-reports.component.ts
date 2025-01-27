import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-issuer-reports',
  templateUrl: './issuer-reports.component.html',
  styleUrls: ['./issuer-reports.component.scss'],
})
export class IssuerReportsComponent implements OnInit {
  userData: object;
  certifications: Array<object>;
  loading: boolean = true;
  statuses: Array<object>;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.userData = this.utils.getStore('userData');
  }

  ngOnInit(): void {
    const payload = {
      userEmail: this.userData['userEmail'],
    };
    this.ds.getCertifications(payload).subscribe((e) => {
      this.certifications = this.modelData(e.recentCertifications);
      this.loading = false;
    });

    this.statuses = [
      { name: 'Submitted', value: 'submitted', count: 0, severity: 'success' },
      {
        name: 'Under-Review',
        value: 'in-review',
        count: 0,
        severity: 'warning',
      },
      { name: 'Draft', value: 'draft', count: 0, severity: 'danger' },
    ];
  }

  modelData = (data) => {
    let processedData = [];
    data.forEach((item, index) => {
      const temp = {
        no: index + 1,
        certId: item.certificationId,
        name: item.uniqueName,
        certType: item.certificationType,
        date: item.applicationDate,
        instrType: item.instrumentType,
        status: item.certificationStatus,
        certificate: item.certificate,
        approval: item.approval,
      };
      processedData.push(temp);
    });

    this.statuses.forEach((st) => {
      st['count'] = this.getListCount(data, st['value']);
    });

    return processedData;
  };

  getListCount = (list, key) => {
    const filteredList = list.filter((item) => item.certificationStatus === key);
    return filteredList.length || 0;
  };

  deleteCertification = (data) => {
    const payload = {
      certificationId: data['certId'],
      certificationType: data['certType'],
    };

    this.ds.removeCertification(payload).subscribe(
      (res) => {
        const filCerts = this.certifications.filter((e) => e['certId'] !== data['certId']);
        this.certifications = this.utils.addIndex(filCerts);
        this.utils.showMessage('c', 'success', 'Success', 'Certification Deleted');
      },
      (error) => {
        this.utils.showMessage('c', 'error', 'Error', 'Please try again later');
      }
    );
  };
}
