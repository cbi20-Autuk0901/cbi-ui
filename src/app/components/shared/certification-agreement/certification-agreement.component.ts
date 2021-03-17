import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  DatastoreService
} from 'src/app/services/data-store/data-store.service';

@Component({
  selector: 'app-certification-agreement',
  templateUrl: './certification-agreement.component.html',
  styleUrls: ['./certification-agreement.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }, ],
})
export class CertificationAgreementComponent implements OnInit {
  @Input() mainData: object;
  @Output() currentPageEvent = new EventEmitter < object > ();

  pageData: object;
  userData: object;

  constructor(
    private fb: FormBuilder,
    private parent: FormGroupDirective,
    private ds: DatastoreService
  ) {}

  ngOnInit(): void {
    this.pageData = {
      showNext: true,
      showBack: true,
      pageName: 'caForm',
    };
    setTimeout(() => {
      this.currentPageEvent.emit(this.pageData);
    });

    this.parent.form.addControl('caForm', this.fb.group({
      applicationDate: this.fb.control('', [Validators.required]),
      issuingEntityLegalName: this.fb.control('', [Validators.required]),
      debtInstrumentsUniqueName: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      issuerContactPerson: this.fb.control('', [Validators.required]),
      signature: this.fb.control('', [Validators.required]),
    }));

    this.userData = this.ds.getStore('userData');

    if (this.mainData['certId']) {
      this.ds.formResume('caForm', this.mainData)
        .subscribe((data) => {
          this.caForm.patchValue(data);
        });
    }
  }

  get caForm() {
    return this.parent.form.get('caForm') as FormGroup;
  }
}
