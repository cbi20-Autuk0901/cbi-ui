import { Component, OnChanges, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { BlockerService } from '../../../services/blocker/blocker.service';

@Component({
  selector: 'app-work-board',
  templateUrl: './work-board.component.html',
  styleUrls: ['./work-board.component.scss'],
})
export class WorkBoardComponent implements OnInit, OnChanges {
  userData: object;
  certifications: Array<object>;
  loading: boolean = true;
  statuses: Array<object>;
  pworkSpace: string;
  recentCases: Array<object>;
  selRevCertification: object;
  pdfSrc: string;
  pdfHeaders: object;
  reportStatus: object;
  showSubmit: boolean;
  showSuccess: boolean;

  constructor(
    private ds: DatastoreService,
    private utils: UtilsService,
    private ms: MessageService,
    private blocker: BlockerService
  ) {
    this.pdfHeaders = {
      'Cache-Control':
        'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      Pragma: 'no-cache',
      Expires: '0',
    };
    this.pdfSrc = '';
    this.userData = this.utils.getStore('userData');
    this.reportStatus = {
      caAssuranceReport: false,
      signedDocument: false,
      gbAssuranceReport: false,
      cbi: false,
      currentReport: '',
      pdfLoaded: false,
    };
    this.showSubmit = false;
    this.showSuccess = false;
  }

  ngOnChanges(changes) {
    console.log(changes);
  }

  ngOnInit(): void {
    this.loadWorkBoard();

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

  test = () => {
    console.log('wewe');
  };
  loadWorkBoard = () => {
    this.reportStatus = {
      caAssuranceReport: false,
      signedDocument: false,
      gbAssuranceReport: false,
      cbi: false,
      currentReport: '',
      pdfLoaded: false,
    };
    const payload = {
      userEmail: this.userData['userEmail'],
    };
    this.ds.workBoard(payload).subscribe((res) => {
      this.certifications = res.assignedCertifications.map((e, i) => {
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

      this.pdfSrc = '';
      this.statuses.forEach((st) => {
        st['count'] = this.getListCount(this.certifications, st['value']);
      });
      this.pworkSpace = window.atob(res.workSpace.notes);
      this.recentCases = this.getRecentApproved(res.assignedCertifications);
      this.reviewCertification();

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
      workSpace: window.btoa(this.pworkSpace),
      userEmail: this.userData['userEmail'],
    };
    this.ds.savePWorkSpace(payload).subscribe((e) => {
      console.log(e);
    });
  };

  reviewCertification = (cert?) => {
    this.selRevCertification = cert;
    this.reportStatus['currentReport'] = '';
    this.pdfSrc = '';
  };

  reviewReport = (name) => {
    this.reportStatus['currentReport'] = name;
    const isCbi = !!(name === 'cbi');
    this.showApproveBtn(isCbi);
    if (name) {
      this.pdfSrc = isCbi
        ? ''
        : 'http://143.110.213.22:8883/file/' + this.selRevCertification[name];
    }
  };

  reviewerInput = (input, name) => {
    this.reportStatus[name] = input;
    this.showSubmit =
      this.reportStatus['caAssuranceReport'] &&
      this.reportStatus['signedDocument'] &&
      this.reportStatus['gbAssuranceReport'] &&
      this.reportStatus['cbi'];
  };

  showApproveBtn = (flag) => {
    this.reportStatus['pdfLoaded'] = flag;
  };

  submitApproval = () => {
    const payload = {
      userEmail: this.userData['userEmail'],
      certificationType: this.selRevCertification['certificationType'],
      certificationId: this.selRevCertification['certificationId'],
    };

    this.ds.approveCertification(payload).subscribe((e) => {
      this.showSuccess = true;
    });
  };

  showError = (severity, title, msg) => {
    this.utils.showMessage(severity, title, msg);
  };
}
