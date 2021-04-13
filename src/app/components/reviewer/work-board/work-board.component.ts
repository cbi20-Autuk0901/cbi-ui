import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { encode, decode } from 'html-entities';
import * as moment from 'moment';

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
  pworkSpace: string;
  recentCases: Array<object>;
  selRevCertification: object;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.userData = this.utils.getStore('userData');
  }

  ngOnInit(): void {
    this.loadWorkBoard();

    this.statuses = [
      { name: 'Approved', value: 'submitted', count: 0, severity: 'success' },
      {
        name: 'Under-Review',
        value: 'in-review',
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
        caAssuranceReport: item.caAssuranceReport,
        gbAssuranceReport: item.gbAssuranceReport,
      };
      processedData.push(temp);
    });

    this.statuses.forEach((st) => {
      st['count'] = this.getListCount(data, st['value']);
    });

    return processedData;
  };

  loadWorkBoard = () => {
    const payload = {
      userEmail: this.userData['userEmail'],
    };
    this.ds.workBoard(payload).subscribe((e) => {
      this.certifications = this.modelData(e.assignedCertifications);
      this.pworkSpace = decode(e.workSpace.notes);
      this.recentCases = this.getRecentApproved(e.assignedCertifications);

      this.loading = false;
    });
  };

  getListCount = (list, key) => {
    const filteredList = list.filter(
      (item) => item.certificationStatus === key
    );
    return filteredList.length || 0;
  };

  getRecentApproved = (data) => {
    const filteredC = data.filter((e) => {
      return e.approvedDate;
    });
    const sortedC = filteredC.sort((a, b) => {
      return (
        a.approvedDate &&
        b.approvedDate &&
        moment(b.approvedDate).diff(a.approvedDate)
      );
    });

    return sortedC.slice(0, 3);
  };

  savePSpace = () => {
    const payload = {
      workSpace: encode(this.pworkSpace, {
        mode: 'nonAsciiPrintable',
        level: 'xml',
      }),
      userEmail: this.userData['userEmail'],
    };
    this.ds.savePWorkSpace(payload).subscribe((e) => {
      console.log(e);
    });
  };

  reviewCertification = (cert) => {
    this.selRevCertification = cert;
  };

  reviewReport = (path) => {
    this.ds.fetchReport(path).subscribe((e) => {
      console.log(e);
    });
  };
}
