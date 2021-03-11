import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
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
  firstForm: FormGroup;
  secondForm: FormGroup;
  instrumentType: string;

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

    this.firstForm = this.fb.group({
      uniqueName: this.fb.control('', [Validators.required]),
      issuanceCountry: this.fb.control('', [Validators.required]),
      cusip: this.fb.control('', [Validators.required]),
      localCurrency: this.fb.control('', [Validators.required]),
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
    });
    this.secondForm = this.fb.group({
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
    });

    this.parent.form.addControl('cbiForm', this.firstForm);
    this.parent.form.addControl('cbiFormContd', this.secondForm);
    this.instrumentType = this.ds.getStore('instrumentType');
  }

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
