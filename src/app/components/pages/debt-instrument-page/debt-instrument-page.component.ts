import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DatastoreService } from 'src/app/services/data-store/data-store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-debt-instrument-page',
  templateUrl: './debt-instrument-page.component.html',
  styleUrls: ['./debt-instrument-page.component.scss'],
})
export class DebtInstrumentPageComponent implements OnInit {
  currentForm: number;
  pageData: object;
  diForm: FormGroup;
  userData: object;
  instrumentType: string;
  certificationId: string;
  certificationType: string;

  constructor(
    private fb: FormBuilder,
    private ds: DatastoreService,
    private route: ActivatedRoute
  ) {
    this.currentForm = 1;
    this.diForm = new FormGroup({});
    this.userData = this.ds.getStore('userData');
    this.instrumentType = this.route.snapshot.paramMap.get('type');
    this.certificationType = this.ds.getStore('certificationType');
    this.ds.setStore(
      'instrumentType',
      this.instrumentType.replace(/(^[a-z])|(\s+[a-z])/g, (txt) =>
        txt.toUpperCase()
      )
    );
  }

  ngOnInit(): void {}

  switchForm = (type: string) => {
    if (type === 'next' && this.currentForm < 3) {
      ++this.currentForm;
    }
    if (type === 'back' && this.currentForm > 1) {
      --this.currentForm;
    }
  };

  getPageInfo = (data: object) => {
    this.pageData = data;
  };

  saveFormStatus = (page: string) => {
    const payload = {
      ...this.diForm.value[page],
      userEmail: this.userData['userEmail'],
      instrumentType: this.instrumentType,
      certificationType: this.certificationType,
      certificationId: this.certificationId || '',
    };
    if (page === 'arForm') {
      this.ds.upload(payload).subscribe((data) => {
        this.certificationId = data.certificationId;
        alert('Data Saved');
      });
    } else {
      this.ds.formSave(payload, page).subscribe((data) => {
        this.certificationId = data.certificationId;
        alert('Data Saved');
      });
    }
  };

  submitApplication = () => {
    const payload = {
      userEmail: this.userData['userEmail'],
      instrumentType: this.instrumentType,
      certificationType: this.certificationType,
      certificationId: this.certificationId || '',
    };

    this.ds.submitApplication(payload).subscribe((data) => {
      this.certificationId = data.certificationId;
    });
  };
}
