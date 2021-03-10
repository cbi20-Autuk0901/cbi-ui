import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { DatastoreService } from 'src/app/services/data-store/data-store.service';

@Component({
  selector: 'app-certification-agreement',
  templateUrl: './certification-agreement.component.html',
  styleUrls: ['./certification-agreement.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class CertificationAgreementComponent implements OnInit {
  @Output() currentPageEvent = new EventEmitter<object>();

  pageData: object = {
    showNext: true,
    showBack: true,
    pageName: 'caForm',
  };
  caForm: FormGroup;
  userData: object;

  constructor(
    private fb: FormBuilder,
    private parent: FormGroupDirective,
    private ds: DatastoreService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.currentPageEvent.emit(this.pageData);
    });

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

    this.parent.form.addControl('caForm', this.caForm);
  }
}
