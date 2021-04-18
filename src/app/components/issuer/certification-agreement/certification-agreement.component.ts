import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UtilsService } from '../../../services/utils/utils.service';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import * as moment from 'moment';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

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

  constructor(
    private fb: FormBuilder,
    private ds: DatastoreService,
    private messageService: MessageService,
    private utils: UtilsService
  ) {
    this.caSignedUploaded = false;
    this.reportSrc = '';
    this.reportName = '';
    this.reportHeaders = {
      'Cache-Control':
        'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
      Pragma: 'no-cache',
      Expires: '0',
    };

    pdfDefaultOptions.assetsFolder = 'assets';
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
      this.ds.formResume('caForm', this.mainData).subscribe((data) => {
        if (data.applicationDate)
          data['applicationDate'] = new Date(data.applicationDate);
        this.caForm.patchValue(data);
      });
    }
  }

  switchPage = (type: string) => {
    if (type === 'next') {
      if (this.caSignedUploaded) {
        this.ds.updateValue(
          'currentFormPage',
          this.mainData['userRole'] === 'singleIssuer' ? 'cbiPage' : 'arPage'
        );
      } else {
        this.utils.showMessage(
          'error',
          'Error',
          'Please upload Signed Certification Agreement'
        );
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
    this.reportSrc = '';
    const payload = {
      ...this[form].value,
      userEmail: this.mainData['userEmail'],
      instrumentType: this.mainData['instrType'],
      certificationType: this.mainData['certType'],
      certificationId: this.mainData['certId'] || '',
    };

    this.ds.formSave(payload, form).subscribe(
      (data) => {
        this.reportName = data.agreement;
        this.reportSrc = 'http://143.110.213.22:8883/file/' + data.agreement;
        this.utils.showMessage('success', 'Success', 'Data Saved');
      },
      (error) => {
        this.utils.showMessage('error', 'Error', 'Invalid Form Details');
      }
    );
  };

  uploadFile = (event) => {
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
          this.utils.showMessage(
            'success',
            'Success',
            'File uploaded successfully'
          );
          this.caSignedUploaded = true;
        },
        (error) => {
          this.utils.showMessage('error', 'Error', 'File upload failed');
        }
      );
    }
  };
}