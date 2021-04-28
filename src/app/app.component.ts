import { Component, OnChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatastoreService } from './services/data-store/data-store.service';
import { BlockerService } from './services/blocker/blocker.service';
import { Observable } from 'rxjs';
import { UtilsService } from './services/utils/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnChanges {
  title = 'CBI';
  currentPage = '';
  showBlocker: Observable<boolean>;
  isLoggedin: boolean;

  constructor(
    private router: Router,
    private ds: DatastoreService,
    private blocker: BlockerService,
    private utils: UtilsService
  ) {
    setTimeout(() => (this.showBlocker = this.blocker.status));

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedin =
          !!this.utils.getStore('userData') &&
          this.utils.getStore('userData')['userEmail'];
        this.currentPage = event.url;
        this.ds.updateValue('currentPage', this.currentPage);
      }
    });
  }

  ngOnChanges() {}
}
