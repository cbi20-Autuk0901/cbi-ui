import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  DatastoreService
} from 'src/app/services/data-store/data-store.service';
@Component({
  selector: 'app-certification-types-page',
  templateUrl: './certification-types-page.component.html',
  styleUrls: ['./certification-types-page.component.scss'],
})
export class certTypesPageComponent implements OnInit {
  certType: string = '';
  userSelection: object = {
    certType: '',
    instrType: '',
  };
  constructor (private route: ActivatedRoute, private ds: DatastoreService) { }

  ngOnInit (): void {
    this.route.queryParams.subscribe((params) => {
      this.certType = params['certType'];
    });
  }
}
