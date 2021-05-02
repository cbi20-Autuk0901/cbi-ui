import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { UtilsService } from '../../../services/utils/utils.service';

import { MessageService } from 'primeng/api';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-climate-bond-information',
  templateUrl: './climate-bond-information.component.html',
  styleUrls: ['./climate-bond-information.component.scss'],
})
export class ClimateBondInformationComponent implements OnInit {
  @Input() mainData: object;
  @ViewChild('formTrigger') frmBtn;

  cbiForm: FormGroup;
  cbiFormContd: FormGroup;
  cbiFormSubmitted: boolean;
  cbiFormContdSubmitted: boolean;

  currentForm: string;
  instrType: string;
  calendarYears: Array<object>;

  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private ds: DatastoreService,
    private messageService: MessageService,
    private utils: UtilsService,
    private router: Router
  ) {
    this.isLoading = true;
    this.currentForm = 'cbiForm';
    this.calendarYears = this.utils.generateYearList(2000, 2099);
    this.cbiForm = this.fb.group({
      uniqueName: ['', [Validators.required]],
      issuanceCountry: [''],
      cusip: [''],
      isin: [''],
      coupon: [''],
      amountIssued: this.fb.array(['']),
      localCurrency: this.fb.array(['']),
      underwriter: this.fb.array(['']),
      daInstrumentType: [''],
      issueDate: [''],
      maturityDate: [''],
      renewableEnergy: this.fb.array([
        this.fb.control('', Validators.required),
      ]),
      renewableEnergyText: this.fb.array([
        this.fb.control('', Validators.required),
      ]),
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
      contactName: [''],
      position: [''],
      company: [''],
      contactNumber: ['', [Validators.pattern('^[0-9]*$')]],
      invoiceName: [''],
    });
  }

  ngOnInit(): void {
    this.instrType = this.mainData['instrType'];
    this.switchForm('cbiForm');

    this.cbiForm.valueChanges.subscribe((e) => {
      this.cbiFormSubmitted = false;
    });
    this.cbiFormContd.valueChanges.subscribe((e) => {
      this.cbiFormContdSubmitted = false;
    });
  }

  get localCurrency() {
    return this.cbiForm.get('localCurrency') as FormArray;
  }

  get underwriter() {
    return this.cbiForm.get('underwriter') as FormArray;
  }

  get amountIssued() {
    return this.cbiForm.get('amountIssued') as FormArray;
  }
  get renewableEnergy() {
    return this.cbiForm.get('renewableEnergy') as FormArray;
  }
  get renewableEnergyText() {
    return this.cbiForm.get('renewableEnergyText') as FormArray;
  }
  get issueDate() {
    return this.cbiForm.get('issueDate') as FormControl;
  }
  get maturityDate() {
    return this.cbiForm.get('maturityDate') as FormControl;
  }

  addField(name: string, value: string, required?: boolean) {
    if (this[name].controls.length < 5) {
      this[name].push(this.fb.control(value));
    }
  }

  removeField(name: string, index: number) {
    this[name].removeAt(index);
  }

  formGenerator = (formName, FormData?) => {
    if (FormData) {
      Object.keys(FormData).forEach((name) => {
        const val = FormData[name];
        if (Array.isArray(val)) {
          for (let i = this[name].length; i < val.length; i++) {
            this[name].push(this.fb.control(''));
          }
        }
        if (name === 'issueDate' && val) FormData['issueDate'] = new Date(val);
        if (name === 'maturityDate' && val)
          FormData['maturityDate'] = new Date(val);
      });

      this[formName].patchValue(FormData);
    }
  };

  switchForm = (name: string) => {
    if (name === 'cbiFormContd' && !this.cbiFormSubmitted) {
      this.utils.showMessage(
        'warn',
        'Warning',
        'Please Save form before proceeding to next page'
      );
      return false;
    }
    this.ds.formResume(name, this.mainData).subscribe(
      (data) => {
        this.formGenerator(name, data);
        this.currentForm = name;
        this.isLoading = false;
      },
      () => {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/debt-instrument/pre/bond']);
          });
      }
    );
  };

  switchPage = (type: string) => {
    if (!this.cbiFormContdSubmitted) {
      this.utils.showMessage(
        'warn',
        'Warning',
        'Please Save form before proceeding to next page'
      );
      return false;
    }
    if (type === 'next') {
      this.ds.updateValue(
        'currentFormPage',
        this.mainData['userRole'] !== 'singleIssuer' ? 'caPage' : 'arPage'
      );
    }

    if (type === 'back') {
      this.ds.updateValue('currentFormPage', 'caPage');
    }
  };

  saveFormStatus = (form: string) => {
    if (this[form].valid) {
      const payload = {
        ...this[form].value,
        userEmail: this.mainData['userEmail'],
        instrumentType: this.instrType,
        certificationType: this.mainData['certType'],
        certificationId: this.mainData['certId'] || '',
      };
      this.ds.formSave(payload, form).subscribe(
        (data) => {
          this.utils.showMessage('success', 'Success', 'Data Saved');
          this[form + 'Submitted'] = true;
        },
        (error) => {
          this.utils.showMessage('error', 'Error', 'Invalid Form Details');
        }
      );
    } else {
      Object.keys(this[form].controls).forEach((field) => {
        const control = this[form].get(field);
        control.markAsDirty({ onlySelf: true });
      });
      this.utils.showMessage(
        'error',
        'Error',
        'Please fill all mandatory fields mentioned with "*" '
      );
    }
  };

  triggerFormSave = () => {
    this.frmBtn.nativeElement.click();
  };
}
