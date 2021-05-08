import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilsService } from '../../../services/utils/utils.service';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import * as moment from 'moment';
import { BlockerService } from '../../../services/blocker/blocker.service';

@Component({
  selector: 'app-certification-agreement',
  templateUrl: './certification-agreement.component.html',
  styleUrls: ['./certification-agreement.component.scss'],
})
export class CertificationAgreementComponent implements OnInit {
  @Input() mainData: object;

  pageData: object;
  userData: object;
  caSignedUploaded: boolean;

  caForm: FormGroup;
  reportSrc: string;
  reportName: string;
  reportHeaders: object;
  reviewerEmail: string;

  constructor(
    private fb: FormBuilder,
    private ds: DatastoreService,
    private utils: UtilsService,
    private blocker: BlockerService
  ) {
    this.caSignedUploaded = false;
    this.reportSrc = '';
    this.reportName = '';
    this.reviewerEmail = '';
    this.reportHeaders = {
      'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      Pragma: 'no-cache',
      Expires: '0',
    };
  }

  ngOnInit(): void {
    this.caForm = this.fb.group({
      applicationDate: [''],
      issuingEntityLegalName: [''],
      debtInstrumentsUniqueName: [''],
      address: [''],
      email: [''],
      issuerContactPerson: [''],
      signature: [''],
    });

    this.userData = this.utils.getStore('userData');

    if (this.mainData['certId']) {
      this.ds.formResume('caForm', this.mainData).subscribe(
        (data) => {
          if (data.applicationDate) data['applicationDate'] = new Date(data.applicationDate);
          this.caForm.patchValue(data);
          if (this.mainData['certType'] === 'post') {
            this.caSignedUploaded = true;
            this.reportSrc = 'http://143.110.213.22:8883/file/' + data.agreement;
            this.reviewerEmail = data.reviewer;
          }
        },
        (error) => {
          this.utils.showMessage('c', 'error', 'Error', 'Please try again');
        }
      );
    }
  }

  loader = (val) => {
    val ? this.blocker.on() : this.blocker.off();
  };

  switchPage = (type: string) => {
    this.utils.clearMessage();
    if (type === 'next') {
      if (this.caSignedUploaded) {
        this.ds.updateValue('currentFormPage', this.mainData['userRole'] === 'singleIssuer' ? 'cbiPage' : 'arPage');
      } else {
        this.utils.showMessage('c', 'error', 'Error', 'Please upload Signed Certification Agreement');
      }
    }
    if (type === 'back') {
      this.ds.updateValue('currentFormPage', 'cbiPage');
    }
  };

  downloadPDF() {
    document.getElementById('download').click();
  }

  saveFormStatus = (form: string) => {
    this.utils.clearMessage();
    this.reportSrc = '';
    const payload = {
      ...this[form].value,
      userEmail: this.mainData['userEmail'],
      instrumentType: this.mainData['instrType'],
      certificationType: this.mainData['certType'],
      certificationId: this.mainData['certId'] || '',
    };

    payload.applicationDate = new Date(
      Date.UTC(
        payload.applicationDate.getFullYear(),
        payload.applicationDate.getMonth(),
        payload.applicationDate.getDate()
      )
    );

    this.ds.formSave(payload, form).subscribe(
      (data) => {
        this.reportName = data.agreement;
        this.reportSrc = 'http://143.110.213.22:8883/file/' + data.agreement;
        this.utils.showMessage('c', 'success', 'Success', 'Data Saved');
        this.blocker.on();
      },
      (error) => {
        this.utils.showMessage('c', 'error', 'Error', 'Invalid Form Details');
      }
    );
  };

  uploadFile = (event) => {
    this.utils.clearMessage();
    if (event.target.files.length > 0) {
      const payload = {
        userEmail: this.mainData['userEmail'],
        certificationType: this.mainData['certType'],
        certificationId: this.mainData['certId'],
        userRole: this.mainData['userRole'],
        signedCertificationAgreement: event.target.files[0],
      };

      this.ds.upload(payload, 'ca').subscribe(
        () => {
          this.utils.showMessage('c', 'success', 'Success', 'File uploaded successfully');
          this.caSignedUploaded = true;
        },
        (error) => {
          this.utils.showMessage('c', 'error', 'Error', 'File upload failed');
        }
      );
    }
  };
}
