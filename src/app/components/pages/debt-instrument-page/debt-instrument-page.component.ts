import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';
import {
  DatastoreService
} from 'src/app/services/data-store/data-store.service';
import {
  ActivatedRoute
} from '@angular/router';

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
  instrType: string;
  certId: string;
  certType: string;
  mainData: object;

  constructor(
    private ds: DatastoreService,
    private route: ActivatedRoute
  ) {
    this.currentForm = 1;
    this.diForm = new FormGroup({});
    this.userData = this.ds.getStore('userData');
    this.instrType = this.route.snapshot.paramMap.get('instrType');
    this.certType = this.route.snapshot.paramMap.get('certType');
    this.certId = this.route.snapshot.queryParamMap.get('certId');
    this.mainData = {
      instrType: this.instrType.replace(/(^[a-z])|(\s+[a-z])/g, (txt) =>
        txt.toUpperCase()
      ),
      certType: this.certType,
      certId: this.certId
    };
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

  saveFormStatus = (form: string) => {
    const page = form;
    if (form === 'cbiFormContd') form = 'cbiForm';
    const payload = {
      ...this.diForm.value[form],
      userEmail: this.userData['userEmail'],
      instrumentType: this.instrType,
      certificationType: this.certType,
      certificationId: this.certId || '',
    };
    if (page === 'arForm') {
      this.ds.upload(payload)
        .subscribe((data) => {
          this.certId = data.certificationId;
          alert('Data Saved');
        });
    } else {
      this.ds.formSave(payload, page)
        .subscribe((data) => {
          this.certId = data.certificationId;
          alert('Data Saved');
        });
    }
  };

  submitApplication = () => {
    const payload = {
      userEmail: this.userData['userEmail'],
      instrType: this.instrType,
      certType: this.certType,
      certId: this.certId || '',
    };

    this.ds.submitApplication(payload)
      .subscribe((data) => {
        this.certId = data.certId;
      });
  };
}
