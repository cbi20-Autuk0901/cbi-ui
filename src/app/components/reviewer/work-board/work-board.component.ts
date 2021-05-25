import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';
import * as moment from 'moment';
import { BlockerService } from '../../../services/blocker/blocker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
  pdfSrc: string;
  pdfHeaders: object;
  reportStatus: object;
  showSubmit: boolean;
  showSuccess: boolean;

  constructor(
    private ds: DatastoreService,
    private utils: UtilsService,
    private blocker: BlockerService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {
    this.pdfHeaders = {
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
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
    let cID: string = '';
    this.route.paramMap.subscribe((param) => {
      cID = param.get('cID');
      this.loadWorkBoard(cID);
    });
  }

  loadWorkBoard = (cID?: string) => {
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
      const selCert = res.assignedCertifications.find((cert) => cert['certificationId'] === cID);

      if (selCert && selCert['certificationStatus'] !== 'approved') {
        this.reviewCertification(selCert);
      } else {
        this.location.go('/work-board');
        this.certifications = res.assignedCertifications.map((e, i) => {
          e['renewableEnergy'] = (e['renewableEnergy'] && e['renewableEnergy'][0]) || '';
          e['amountIssued'] = (e['amountIssued'] && e['amountIssued'][0]) || '';
          e['localCurrency'] = (e['localCurrency'] && e['localCurrency'][0]) || '';
          e['underwriter'] = (e['underwriter'] && e['underwriter'][0]) || '';
          e['renewableEnergyText'] = (e['renewableEnergyText'] && e['renewableEnergyText'][0]) || '';
          e['no'] = i + 1;
          e['applicationDate'] = e['applicationDate'] ? Date.parse(e['applicationDate']) : '';
          return e;
        });
        this.pdfSrc = '';
        this.statuses.forEach((st) => {
          st['count'] = this.getListCount(this.certifications, st['value']);
        });
        this.pworkSpace = this.utils.decrypt(res.workSpace.notes, 'w0rk SpaCE D@t@12334 []');
        this.recentCases = this.getRecentApproved(res.assignedCertifications);
        this.reviewCertification();
      }

      this.loading = false;
    });
  };

  getListCount = (list, key) => {
    const filteredList = list.filter((item) => item.certificationStatus === key);
    return filteredList.length || 0;
  };

  getRecentApproved = (data) => {
    const filteredC = data.filter((e) => {
      return e.approvedDate;
    });
    const sortedC = filteredC.sort((a, b) => {
      return a.approvedDate && b.approvedDate && moment(b.approvedDate).diff(a.approvedDate);
    });

    return sortedC.slice(0, 3);
  };

  savePSpace = () => {
    const encData = this.utils.encrypt(this.pworkSpace, 'w0rk SpaCE D@t@12334 []');

    const payload = {
      workSpace: encData,
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
    const fileName = this.selRevCertification[name];

    this.showApproveBtn(isCbi);
    if (fileName) {
      this.blocker.on();
      this.pdfSrc = 'http://143.110.213.22:8883/file/' + this.selRevCertification[name];
    } else {
      this.pdfSrc = '';
      if (!isCbi) this.utils.showMessage('c', 'warn', 'Warning', 'No File uploaded under this name');
    }
  };

  rejectCertification = () => {
    const payload = {
      certificationId: this.selRevCertification['certificationId'],
      certificationType: this.selRevCertification['certificationType'],
    };

    this.ds.removeCertification(payload).subscribe(
      (res) => {
        this.loadWorkBoard();
      },
      (error) => {
        this.utils.showMessage('c', 'error', 'Error', 'Unable to Reject now. Please try again');
      }
    );
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
    if (flag) this.blocker.off();
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
    this.utils.showMessage('c', severity, title, msg);
    this.blocker.off();
  };
}
