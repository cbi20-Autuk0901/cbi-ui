import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils/utils.service';
import { DatastoreService } from '../../../services/data-store/data-store.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  dashboardData: object;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.dashboardData = { ...this.utils.getStore('userData') };
  }
  ngOnInit(): void {
    const payload = {
      userEmail: this.dashboardData['userEmail'],
    };

    this.ds.getDashboard(payload).subscribe((data) => {
      this.dashboardData = data;
    });
  }
}
