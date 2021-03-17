import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import {
  DatastoreService
} from 'src/app/services/data-store/data-store.service';

@Component({
  selector: 'app-climate-bond-information',
  templateUrl: './climate-bond-information.component.html',
  styleUrls: ['./climate-bond-information.component.scss'],
  viewProviders: [{
    provide: ControlContainer,
    useExisting: FormGroupDirective
  }, ],
})
export class ClimateBondInformationComponent implements OnInit {
  @Input() mainData:object;
  @Output() currentPageEvent = new EventEmitter < object > ();

  currentPage: string;
  pageData: object = {
    showNext: false,
    showBack: false,
    pageName: 'cbiForm',
  };

  instrType: string;

  testData: object = {
    uniqueName: 'jkhkjhk',
    issuanceCountry: '',
    cusip: 'klsdkl',
    isin: '',
    coupon: '',
    amountIssued: [],
    underwriter: [],
    issueDate: '',
    maturityDate: '',
    useOfProceeds: '',
    useOfProceedsRevenue: '',
    verifierName: '',
    renewableEnergy: [],
    renewableEnergyText: [],
    localCurrency: [],
    userEmail: 'issuer@vigameq.com',
    instrumentType: 'bond',
    certificationType: 'pre',
    certificationId: '',
    headOfficeAddress: "",
    vatNumber: "",
    businessRegistration: "",
    contactName: "",
    position: "",
    company: "",
    contactNumber: "",
    invoiceName: "",
  };

  constructor(
    private fb: FormBuilder,
    private parent: FormGroupDirective,
    private ds: DatastoreService
  ) {}

  ngOnInit(): void {

    this.parent.form.addControl(
      'cbiForm',
      this.fb.group({
        uniqueName: this.fb.control('', [Validators.required]),
        issuanceCountry: this.fb.control('', [Validators.required]),
        cusip: this.fb.control('', [Validators.required]),
        isin: this.fb.control('', [Validators.required]),
        coupon: this.fb.control('', [Validators.required]),
        amountIssued: this.fb.array([this.fb.control('')]),
        underwriter: this.fb.array([this.fb.control('')]),
        issueDate: this.fb.control('', [Validators.required]),
        maturityDate: this.fb.control('', [Validators.required]),
        useOfProceeds: this.fb.control('', [Validators.required]),
        useOfProceedsRevenue: this.fb.control('', [Validators.required]),
        verifierName: this.fb.control('', [Validators.required]),
        renewableEnergy: this.fb.array([this.fb.control('')]),
        renewableEnergyText: this.fb.array([this.fb.control('')]),
        localCurrency: this.fb.array([this.fb.control('')]),
        headOfficeAddress: this.fb.control('', [Validators.required]),
        vatNumber: this.fb.control('', [Validators.required]),
        businessRegistration: this.fb.control('', [Validators.required]),
        contactName: this.fb.control('', [Validators.required]),
        position: this.fb.control('', [Validators.required]),
        company: this.fb.control('', [Validators.required]),
        contactNumber: this.fb.control('', [Validators.required]),
        invoiceName: this.fb.control('', [Validators.required]),
      })
    );

    setTimeout(() => {
      this.switchForm('first');
    });
    
    this.instrType = this.mainData['instrType'];
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

  get cbiForm() {
    return this.parent.form.get('cbiForm') as FormGroup;
  }

  get cbiFormContd() {
    return this.parent.form.get('cbiFormContd') as FormGroup;
  }


  addField(name: string, value: string) {
    if (this[name].controls.length < 5)
      this[name].push(this.fb.control(value));
  }

  formGenerator = (form, data) => {
    Object.entries(data)
      .forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((e) => {
            (this[form].get(key) as FormArray)
            .push(this.fb.control(e));
          });
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

    this.cbiForm.patchValue(this.testData);
    this.formGenerator('cbiForm', this.testData);

  };
}
