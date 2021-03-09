import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

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

  constructor(private fb: FormBuilder, private parent: FormGroupDirective) {}

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

    this.parent.form.addControl('caForm', this.caForm);
  }
}
