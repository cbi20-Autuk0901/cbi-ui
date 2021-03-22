
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { UtilsService } from './../../../services/utils/utils.service';

import { MessageService } from 'primeng/api';
import { DatastoreService } from './../../../services/data-store/data-store.service';

@Component({
  selector: 'app-climate-bond-information',
  templateUrl: './climate-bond-information.component.html',
  styleUrls: ['./climate-bond-information.component.scss'],
})
export class ClimateBondInformationComponent implements OnInit {

  @Input() mainData: object;

  cbiForm: FormGroup;
  cbiFormContd: FormGroup;

  currentForm: string;
  instrType: string;
  calendarYears: Array<object>;

  constructor (
    private fb: FormBuilder,
    private ds: DatastoreService,
    private messageService: MessageService,
    private utils: UtilsService
  ) {
    this.currentForm = 'cbiForm';
    this.calendarYears = this.utils.generateYearList(2000, 2099);
    this.cbiForm = this.fb.group({
      uniqueName: ['', [Validators.required]],
      issuanceCountry: ['', [Validators.required]],
      cusip: ['', [Validators.required]],
      isin: ['', [Validators.required]],
      coupon: ['', [Validators.required]],
      amountIssued: this.fb.array(['']),
      localCurrency: this.fb.array(['']),
      underwriter: this.fb.array(['']),
      issueDate: [null, Validators.required],
      maturityDate: [null, Validators.required],
      renewableEnergy: this.fb.array(['']),
      renewableEnergyText: this.fb.array(['']),
      financingAssets: ['', [Validators.required]],
      proceedsAllocation: ['', [Validators.required]],
      portfolioApproach: ['', [Validators.required]],
      decisionProcedure: ['', [Validators.required]],
      proceedsType: ['', [Validators.required]],
      proceedsProcessDetail: ['', [Validators.required]],
      proceedsAllocationTiming: ['', [Validators.required]],
      proceedsUse: ['', [Validators.required]],
    });
    this.cbiFormContd = this.fb.group({
      allocationReportFreq: ['', [Validators.required]],
      allocationReportFormat: ['', [Validators.required]],
      allocationReportAccess: ['', [Validators.required]],
      allocationReportAddressLink: ['', [Validators.required]],
      breakdownInclusion: ['', [Validators.required]],
      impactReportFreq: ['', [Validators.required]],
      impactReportFormat: ['', [Validators.required]],
      impactReportAccess: ['', [Validators.required]],
      impactReportAddressLink: ['', [Validators.required]],
      quantitativeImpact: ['', [Validators.required]],
      headOfficeAddress: ['', [Validators.required]],
      vatNumber: ['', [Validators.required]],
      businessRegistration: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      company: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      invoiceName: ['', [Validators.required]],
    });
  }

  ngOnInit (): void {
    this.instrType = this.mainData['instrType'];
    this.switchForm('cbiForm');
  }

  get localCurrency () {
    return this.cbiForm.get('localCurrency') as FormArray;
  }

  get underwriter () {
    return this.cbiForm.get('underwriter') as FormArray;
  }

  get amountIssued () {
    return this.cbiForm.get('amountIssued') as FormArray;
  }
  get renewableEnergy () {
    return this.cbiForm.get('renewableEnergy') as FormArray;
  }
  get renewableEnergyText () {
    return this.cbiForm.get('renewableEnergyText') as FormArray;
  }
  get issueDate () {
    return this.cbiForm.get('issueDate') as FormControl;
  }
  get maturityDate () {
    return this.cbiForm.get('maturityDate') as FormControl;
  }

  addField (name: string, value: string) {
    if (this[name].controls.length < 5)
      this[name].push(this.fb.control(value));
  }

  formGenerator = (formName, FormData?) => {

    if (FormData) {
      Object.keys(FormData)
        .forEach((name) => {
          const val = FormData[name];
          if (Array.isArray(val)) {
            for (let i = this[name].length; i < val.length; i++) {
              this[name].push(this.fb.control(''));
            }
          }
          if (typeof val === 'string' && isNaN(FormData[name]) && !isNaN(Date.parse(val))) {
            FormData[name] = new Date(val);
          }
        });

      this[formName].patchValue(FormData);
    }

  };

  switchForm = (name: string) => {

    if (this.mainData['certId']) {
      this.ds.formResume(name, this.mainData)
        .subscribe((data) => {
          this.formGenerator(name, data);
        });
    }

    this.currentForm = name;
  };

  switchPage = (type: string) => {
    if (type === 'next') {
      this.ds.updateValue('currentFormPage', this.mainData['userRole'] !== 'singleIssuer' ? 'caPage' : 'arPage');
    }

    if (type === 'back') {
      this.ds.updateValue('currentFormPage', 'caPage');
    }
  };

  saveFormStatus = (form: string) => {
    const payload = {
      ...this[form].value,
      userEmail: this.mainData['userEmail'],
      instrumentType: this.instrType,
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
