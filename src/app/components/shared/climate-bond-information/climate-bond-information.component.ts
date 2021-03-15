import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { DatastoreService } from 'src/app/services/data-store/data-store.service';

@Component({
  selector: 'app-climate-bond-information',
  templateUrl: './climate-bond-information.component.html',
  styleUrls: ['./climate-bond-information.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class ClimateBondInformationComponent implements OnInit {
  @Output() currentPageEvent = new EventEmitter<object>();

  currentPage: string;
  pageData: object = {
    showNext: false,
    showBack: false,
    pageName: 'cbiForm',
  };
  instrumentType: string;

  testData: object = {
    uniqueName: 'jkhkjhk',
    issuanceCountry: '',
    cusip: 'klsdkl',
    isin: '',
    coupon: '',
    amountIssued: '',
    underwriter: '',
    issueDate: '',
    maturityDate: '',
    useOfProceeds: '',
    useOfProceedsRevenue: '',
    verifierName: '',
    renewableEnergy: '',
    renewableEnergyText: '',
    localCurrency: [],
    userEmail: 'issuer@vigameq.com',
    instrumentType: 'bond',
    certificationType: 'pre',
    certificationId: '',
  };

  constructor(
    private fb: FormBuilder,
    private parent: FormGroupDirective,
    private ds: DatastoreService
  ) {}

  ngOnInit(): void {
    this.currentPage = 'first';
    setTimeout(() => {
      this.currentPageEvent.emit(this.pageData);
    });

    this.parent.form.addControl(
      'cbiForm',
      this.fb.group({
        uniqueName: this.fb.control('', [Validators.required]),
        issuanceCountry: this.fb.control('', [Validators.required]),
        cusip: this.fb.control('', [Validators.required]),
        isin: this.fb.control('', [Validators.required]),
        coupon: this.fb.control('', [Validators.required]),
        amountIssued: this.fb.control('', [Validators.required]),
        underwriter: this.fb.control('', [Validators.required]),
        issueDate: this.fb.control('', [Validators.required]),
        maturityDate: this.fb.control('', [Validators.required]),
        useOfProceeds: this.fb.control('', [Validators.required]),
        useOfProceedsRevenue: this.fb.control('', [Validators.required]),
        verifierName: this.fb.control('', [Validators.required]),
        renewableEnergy: this.fb.control('', [Validators.required]),
        renewableEnergyText: this.fb.control('', [Validators.required]),
        localCurrency: this.fb.array([]),
      })
    );
    this.parent.form.addControl(
      'cbiFormContd',
      this.fb.group({
        headOfficeAddress: this.fb.control('', [Validators.required]),
        vatNumber: this.fb.control('', [Validators.required]),
        businessRegistration: this.fb.control('', [Validators.required]),
        contactName: this.fb.control('', [Validators.required]),
        position: this.fb.control('', [Validators.required]),
        company: this.fb.control('', [Validators.required]),
        contactNumber: this.fb.control('', [Validators.required]),
        invoiceName: this.fb.control('', [Validators.required]),
        renewableEnergy: this.fb.control('', [Validators.required]),
        renewableEnergyText: this.fb.control('', [Validators.required]),
      })
    );

    this.instrumentType = this.ds.getStore('instrumentType');

    this.formGenerator(this.testData);

    this.cbiForm.patchValue(this.testData);
  }

  get localCurrency() {
    return this.cbiForm.get('localCurrency') as FormArray;
  }

  get cbiForm() {
    return this.parent.form.get('cbiForm') as FormGroup;
  }

  addField(name: string, value: string) {
    this[name].push(this.fb.control(value));
  }

  formGenerator = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          value.forEach((e) => {
            (this.cbiForm.get(key) as FormArray).push(this.fb.control(e));
          });
        } else {
          this.addField(key, '');
        }
      }
    });
  };

  switchForm = (name: string) => {
    this.currentPage = name;
    this.pageData = {
      showNext: this.currentPage === 'second',
      showBack: false,
      pageName: this.currentPage === 'second' ? 'cbiFormContd' : 'cbiForm',
    };

    this.currentPageEvent.emit(this.pageData);
  };
}
