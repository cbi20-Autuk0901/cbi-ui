import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatastoreService } from './services/data-store/data-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CBI';
  currentPage = '';

  constructor(private router: Router, private ds: DatastoreService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = this.router.url;
        this.ds.updateValue('currentPage', this.currentPage);
      }
    });
  }
}
