import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isSubmitted: boolean;

  constructor(private fb: FormBuilder, private ds: DatastoreService, private utils: UtilsService) {
    this.isSubmitted = false;
  }

  ngOnInit(): void {
    this.arForm = this.fb.group({
      caAssuranceReport: this.fb.control(null, [Validators.required]),
      gbAssuranceReport: this.fb.control(null, [Validators.required]),
    });
  }

  switchPage = (type: string) => {
    this.utils.clearMessage();
    if (type === 'back') {
      this.ds.updateValue('currentFormPage', this.mainData['userRole'] !== 'singleIssuer' ? 'caPage' : 'cbiPage');
    }
  };

  removeFile = (field, name) => {
    this.arForm.controls[field].setValue(null);
    this[name] = null;
  };

  submitApplication = (form: string) => {
    this.utils.clearMessage();
    if (this.arForm.valid) {
      const payload = {
        ...this[form].value,
        userEmail: this.mainData['userEmail'],
        instrumentType: this.mainData['instrType'],
        certificationType: this.mainData['certType'],
        certificationId: this.mainData['certId'] || '',
      };
      this.ds.upload(payload, 'ar').subscribe(
        (data) => {
          delete payload['caAssuranceReport'];
          delete payload['gbAssuranceReport'];
          this.ds.submitApplication(payload).subscribe((data) => {
            this.certId = data.certificationId;
            this.modalBtn.nativeElement.click();
            this.isSubmitted = true;
          });
        },
        (error) => {
          this.utils.showMessage('c', 'error', 'Error', 'Unable to Upload files. Please try again !');
        }
      );
    } else {
      this.utils.showMessage('c', 'error', 'Error', 'Please Upload Files to Submit Application');
    }
  };

  onChange = (event, name) => {
    this[name] = event.target.files[0].name;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const currentControl = name === 'caName' ? 'caAssuranceReport' : 'gbAssuranceReport';
      this.arForm.patchValue({
        [currentControl]: file,
      });
    }
  };
}
