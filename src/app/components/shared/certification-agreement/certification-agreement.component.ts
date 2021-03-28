import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UtilsService } from './../../../services/utils/utils.service';
import { DatastoreService } from './../../../services/data-store/data-store.service';

import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-certification-agreement',
  templateUrl: './certification-agreement.component.html',
  styleUrls: ['./certification-agreement.component.scss'],
})
export class CertificationAgreementComponent implements OnInit {
  @Input() mainData: object;

  pageData: object;
  userData: object;

  caForm: FormGroup;

  constructor (
    private fb: FormBuilder,
    private ds: DatastoreService,
    private messageService: MessageService,
    private utils: UtilsService
  ) { }

  ngOnInit (): void {

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
      this.ds.formResume('caForm', this.mainData)
        .subscribe((data) => {
          if (data.applicationDate) data['applicationDate'] = new Date(data.applicationDate);
          this.caForm.patchValue(data);
        });
    }
  }

  switchPage = (type: string) => {
    if (type === 'next') {
      this.ds.updateValue('currentFormPage', this.mainData['userRole'] === 'singleIssuer' ? 'cbiPage' : 'arPage');
    }
    if (type === 'back') {
      this.ds.updateValue('currentFormPage', 'cbiPage');
    }
  };

  generatePDF () {

    const element = document.getElementById('test');
    const opt = {
      pagebreak: { mode: 'avoid-all' },
      margin: 1,
      filename: 'Agreement.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  }

  saveFormStatus = (form: string) => {
    const payload = {
      ...this[form].value,
      userEmail: this.mainData['userEmail'],
      instrumentType: this.mainData['instrType'],
      certificationType: this.mainData['certType'],
      certificationId: this.mainData['certId'] || '',
    };
    this.ds.formSave(payload, form)
      .subscribe((data) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Data Saved' });
      }, (error) => {
        this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: 'Invalid Form Details' });
      });
  };

}
