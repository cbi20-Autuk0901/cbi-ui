import { Component, OnChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatastoreService } from './services/data-store/data-store.service';
import { BlockerService } from './services/blocker/blocker.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnChanges {
  title = 'CBI';
  currentPage = '';
  showBlocker: Observable<boolean>;

  constructor(
    private router: Router,
    private ds: DatastoreService,
    private blocker: BlockerService
  ) {
    setTimeout(() => (this.showBlocker = this.blocker.status));

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = this.router.url;
        this.ds.updateValue('currentPage', this.currentPage);
      }
    });
  }

  ngOnChanges() {}
}
