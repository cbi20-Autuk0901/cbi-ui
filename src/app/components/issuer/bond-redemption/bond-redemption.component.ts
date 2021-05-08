import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatastoreService } from './../../../services/data-store/data-store.service';
import { MessageService } from 'primeng/api';
import { UtilsService } from '../../../services/utils/utils.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bond-redemption',
  templateUrl: './bond-redemption.component.html',
  styleUrls: ['./bond-redemption.component.scss'],
})
export class BondRedemptionComponent implements OnInit {
  brForm: FormGroup;
  mainData: object;
  uploadedNames: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private ds: DatastoreService,
    private messageService: MessageService,
    private utils: UtilsService,
    private route: ActivatedRoute
  ) {
    this.mainData = {
      ...this.utils.getStore('userData'),
      instrType: this.route.snapshot.paramMap.get('instrType'),
      certId: this.route.snapshot.queryParamMap.get('certId'),
    };

    console.log(this.mainData);
  }

  ngOnInit(): void {
    this.brForm = this.fb.group({
      file1: this.fb.control(null, [Validators.required]),
      file2: this.fb.control(null),
      file3: this.fb.control(null),
      file4: this.fb.control(null),
      file5: this.fb.control(null),
      fileName1: this.fb.control(null, [Validators.required]),
      fileName2: this.fb.control(null),
      fileName3: this.fb.control(null),
      fileName4: this.fb.control(null),
      fileName5: this.fb.control(null),
    });
  }

  saveFormStatus = (form: string) => {
    const payload = {
      ...this[form].value,
      userEmail: this.mainData['userEmail'],
      instrumentType: this.mainData['instrType'],
      certificationType: this.mainData['certType'],
      certificationId: this.mainData['certId'] || '',
    };
    this.ds.submitBondRedemption(payload).subscribe(
      (data) => {
        this.utils.showMessage('c', 'success', 'Success', 'Application Submitted Successfully');
      },
      (res) => {
        this.utils.showMessage('c', 'error', 'Error', res.error.error);
      }
    );
  };

  removeFile = (index) => {
    this.brForm.controls['file' + index].setValue(null);
    this.brForm.controls['fileName' + index].setValue(null);
    this.uploadedNames[index] = null;
  };

  onChange = (event, index) => {
    this.uploadedNames[index] = event.target.files[0].name;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const currentControl = 'file' + index;
      this.brForm.patchValue({
        [currentControl]: file,
      });
    }
  };
}
