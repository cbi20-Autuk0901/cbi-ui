import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-assurance-report',
  templateUrl: './assurance-report.component.html',
  styleUrls: ['./assurance-report.component.scss'],
})
export class AssuranceReportComponent implements OnInit {
  @Input() mainData: object;
  @ViewChild('submitModal') modalBtn;

  arForm: FormGroup;
  caName: string;
  gbName: string;
  certId: string;

  constructor(
    private fb: FormBuilder,
    private ds: DatastoreService,
    private messageService: MessageService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.arForm = this.fb.group({
      caAssuranceReport: this.fb.control(null, [Validators.required]),
      gbAssuranceReport: this.fb.control(null, [Validators.required]),
    });
  }

  switchPage = (type: string) => {
    if (type === 'back') {
      this.ds.updateValue(
        'currentFormPage',
        this.mainData['userRole'] !== 'singleIssuer' ? 'caPage' : 'cbiPage'
      );
    }
  };

  saveFormStatus = (form: string) => {
    const payload = {
      ...this[form].value,
      userEmail: this.mainData['userEmail'],
      instrumentType: this.mainData['instrType'],
      certificationType: this.mainData['certType'],
      certificationId: this.mainData['certId'] || '',
    };
    this.ds.upload(payload, 'ar').subscribe(
      (data) => {
        this.utils.showMessage('success', 'Success', 'Files Uploaded');
      },
      (error) => {
        this.utils.showMessage('error', 'Error', 'Invalid Files');
      }
    );
  };

  submitApplication = () => {
    const payload = {
      userEmail: this.mainData['userEmail'],
      instrumentType: this.mainData['instrType'],
      certificationType: this.mainData['certType'],
      certificationId: this.mainData['certId'] || '',
    };

    this.ds.submitApplication(payload).subscribe((data) => {
      this.certId = data.certificationId;
      this.modalBtn.nativeElement.click();
    });
  };

  onChange = (event, name) => {
    this[name] = event.target.files[0].name;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const currentControl =
        name === 'caName' ? 'caAssuranceReport' : 'gbAssuranceReport';
      this.arForm.patchValue({
        [currentControl]: file,
      });
    }
  };
}