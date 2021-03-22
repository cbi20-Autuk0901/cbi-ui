import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import {
  DatastoreService
} from 'src/app/services/data-store/data-store.service';

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
    private messageService: MessageService
  ) { }

  ngOnInit (): void {

    this.caForm = this.fb.group({
      applicationDate: this.fb.control('', [Validators.required]),
      issuingEntityLegalName: this.fb.control('', [Validators.required]),
      debtInstrumentsUniqueName: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      issuerContactPerson: this.fb.control('', [Validators.required]),
      signature: this.fb.control('', [Validators.required]),
    });

    this.userData = this.ds.getStore('userData');

    if (this.mainData['certId']) {
      this.ds.formResume('caForm', this.mainData)
        .subscribe((data) => {
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

  saveFormStatus = (form: string) => {
    const payload = {
      ...this[form].value,
      userEmail: this.mainData['userEmail'],
      instrumentType: this.mainData['instrType'],
      certificationType: this.mainData['certType'],
      certificationId: this.mainData['Id'] || '',
    };
    this.ds.formSave(payload, form)
      .subscribe((data) => {
        this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Data Saved' });
      }, (error) => {
        this.messageService.add({ key: 'bc', severity: 'error', summary: 'Error', detail: 'Invalid Form Details' });
      });
  };

}
