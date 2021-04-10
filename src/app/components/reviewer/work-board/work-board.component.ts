import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-work-board',
  templateUrl: './work-board.component.html',
  styleUrls: ['./work-board.component.scss'],
})
export class WorkBoardComponent implements OnInit {
  userData: object;
  certifications: Array<object>;
  loading: boolean = true;
  statuses: Array<object>;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.userData = this.utils.getStore('userData');
  }

  ngOnInit(): void {
    const payload = {
      // userEmail: this.userData['userEmail'],
      userEmail: 'programmaticissuer@vigameq.com',
    };
    this.ds.getCertifications(payload).subscribe((e) => {
      this.certifications = this.modelData(e.recentCertifications);
      this.loading = false;
    });

    this.statuses = [
      { name: 'Approved', value: 'submitted', count: 0, severity: 'success' },
      {
        name: 'Under-Review',
        value: 'underReview',
        count: 0,
        severity: 'warning',
      },
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
        renewableEnergy:
          (item.renewableEnergy && item.renewableEnergy[0]) || '',
      };
      processedData.push(temp);
    });

    this.statuses.forEach((st) => {
      st['count'] = this.getListCount(data, st['value']);
    });

    return processedData;
  };

  getListCount = (list, key) => {
    const filteredList = list.filter(
      (item) => item.certificationStatus === key
    );
    return filteredList.length || 0;
  };
}
