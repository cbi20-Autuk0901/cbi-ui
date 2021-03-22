
import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute
} from '@angular/router';

import { DatastoreService } from './../../../services/data-store/data-store.service';
import { UtilsService } from './../../../services/utils/utils.service';

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

  constructor (
    private ds: DatastoreService,
    private route: ActivatedRoute,
    private utils: UtilsService
  ) {
    this.userData = this.ds.getStore('userData');
    this.mainData = {
      instrType: this.utils.toSentenceCase(this.route.snapshot.paramMap.get('instrType')),
      certType: this.route.snapshot.paramMap.get('certType'),
      certId: this.route.snapshot.queryParamMap.get('certId'),
      userEmail: this.userData['userEmail'],
      userRole: this.userData['userRole']
    };

    // this.currentFormPage = 'cbiPage';

  }

  ngOnInit (): void {
    this.ds.currentFormPage.subscribe((data) => {
      this.currentFormPage = data;
    });
    this.ds.updateValue('currentFormPage', (this.userData['userRole'] === 'singleIssuer' ? 'caPage' : 'cbiPage'));
  }


}
