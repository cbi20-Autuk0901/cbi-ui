import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute, Router
} from '@angular/router';

import {
  DatastoreService
} from './../../../services/data-store/data-store.service';
import {
  UtilsService
} from './../../../services/utils/utils.service';

@Component({
  selector: 'app-debt-instrument-page',
  templateUrl: './debt-instrument-page.component.html',
  styleUrls: ['./debt-instrument-page.component.scss'],
})
export class DebtInstrumentPageComponent implements OnInit {
  currentFormPage: string;
  userData: object;
  instrType: string;
  certId: string;
  certType: string;
  mainData: object;
  isLoading: boolean;
  headers: object;

  constructor (
    private ds: DatastoreService,
    private route: ActivatedRoute,
    private router: Router,
    private utils: UtilsService
  ) {
    this.isLoading = true;
    this.userData = this.utils.getStore('userData');
    this.certType = this.route.snapshot.paramMap.get('certType');
    this.instrType = this.route.snapshot.paramMap.get('instrType');
    this.certId = this.route.snapshot.queryParamMap.get('certId');
    this.headers = {
      instrType: this.instrType,
      certType: this.certType,
      certId: this.certId,
      userEmail: this.userData['userEmail'],
    };
  }

  ngOnInit (): void {
    this.ds.currentFormPage.subscribe((data) => {
      this.currentFormPage = data;
    });

    if (this.certId) {
      const formToCheck = this.userData['userRole'] === 'singleIssuer' ? 'caForm' : 'cbiForm';
      this.ds.formResume(formToCheck, this.headers)
        .subscribe((data) => {
          this.loadPage();
        }, () => {
          this.generateId();
        });

    } else {
      this.generateId();
    }

  }

  generateId = () => {
    if (this.certType === 'pre') this.headers['certId'] = '';
    this.ds.generateCertification(this.headers).subscribe((data) => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          certId: data.certificationId
        },
      });
      this.certId = data.certificationId;
      this.loadPage();
    });
  };

  loadPage = () => {
    this.mainData = {
      instrType: this.route.snapshot.paramMap.get('instrType'),
      certType: this.certType,
      certId: this.certId,
      userEmail: this.userData['userEmail'],
      userRole: this.userData['userRole']
    };
    this.ds.updateValue('currentFormPage', (this.userData['userRole'] === 'singleIssuer' ? 'caPage' : 'cbiPage'));
    this.isLoading = false;
  };


}
