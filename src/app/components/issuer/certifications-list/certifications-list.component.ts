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
  selectAnnualReport: File;

  constructor(private ds: DatastoreService, private utils: UtilsService, private route: ActivatedRoute) {
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
        date: item.applicationDate,
        instrType: item.instrumentType,
        status: item.certificationStatus,
      };
      processedData.push(temp);
    });
    return processedData;
  };

  onChange = (event, data) => {
    if (event.target.files.length > 0 && event.target.files[0].type === 'application/pdf') {
      this.selectAnnualReport = event.target.files[0];
      const fileName = this.selectAnnualReport.name;
      this.certifications.map((e) => {
        if (e['no'] === data.no) {
          e['fileName'] = fileName;
        } else {
          e['fileName'] = '';
        }

        return e;
      });
    } else {
      this.utils.showMessage('c', 'error', 'Error', 'Please upload a PDF format file');
    }
  };

  uploadReport = (data) => {
    const payload = {
      annualReport: this.selectAnnualReport,
      certificationId: data['certId'],
      certificationType: data['certType'],
    };

    this.ds.submitAnnualReport(payload).subscribe(
      (res) => {
        this.utils.showMessage('c', 'success', 'Success', 'Report Uploaded Successfully');
        this.clearUpload();
      },
      (error) => {
        this.utils.showMessage('c', 'error', 'Error', 'Unable to Upload Report. Please try again.');
      }
    );
  };

  clearUpload = () => {
    this.selectAnnualReport = null;
    this.certifications.map((e) => (e['fileName'] = ''));
  };
}
