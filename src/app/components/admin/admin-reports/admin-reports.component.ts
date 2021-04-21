import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.scss'],
})
export class AdminReportsComponent implements OnInit {
  userData: object;
  certifications: Array<object>;
  loading: boolean = true;
  statuses: Array<object>;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.userData = this.utils.getStore('userData');
    this.statuses = [
      { name: 'Approved', value: 'approved', count: 0, severity: 'success' },
      {
        name: 'Under-Review',
        value: 'in-review',
        count: 0,
        severity: 'warning',
      },
    ];
  }

  ngOnInit(): void {
    const payload = {
      userEmail: this.userData['userEmail'],
    };
    this.ds.getAdminReports(payload).subscribe((res) => {
      this.certifications = res.recentCertifications.map((e, i) => {
        e['renewableEnergy'] =
          (e['renewableEnergy'] && e['renewableEnergy'][0]) || '';
        e['amountIssued'] = (e['amountIssued'] && e['amountIssued'][0]) || '';
        e['localCurrency'] =
          (e['localCurrency'] && e['localCurrency'][0]) || '';
        e['underwriter'] = (e['underwriter'] && e['underwriter'][0]) || '';
        e['renewableEnergyText'] =
          (e['renewableEnergyText'] && e['renewableEnergyText'][0]) || '';
        e['no'] = i + 1;
        return e;
      });
      this.statuses.forEach((st) => {
        st['count'] = this.getListCount(this.certifications, st['value']);
      });
      this.loading = false;
    });
  }

  getListCount = (list, key) => {
    const filteredList = list.filter(
      (item) => item.certificationStatus === key
    );
    return filteredList.length || 0;
  };

  modelData = (data) => {
    let processedData = [];
    let index = 0;
    data.forEach((item) => {
      if (item['certificationStatus'] === 'approved') {
        const temp = {
          no: ++index,
          certId: item.certificationId,
          name: item.uniqueName,
          certType: item.certificationType,
          date: item.applicationDate,
          instrType: item.instrumentType,
          status: item.certificationStatus,
        };

        processedData.push(temp);
      }
    });

    return processedData;
  };
}
