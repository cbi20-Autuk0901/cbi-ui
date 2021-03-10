import { Component, OnInit } from '@angular/core';
import { DatastoreService } from 'src/app/services/data-store/data-store.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  userData: object;
  dashboardData: object;
  constructor(private ds: DatastoreService) {
    this.userData = this.ds.getStore('userData');
  }
  ngOnInit(): void {
    const payload = {
      userEmail: this.userData['userEmail'],
    };

    this.ds.getDashboard(payload).subscribe((data) => {
      this.dashboardData = data;
    });
  }
}
