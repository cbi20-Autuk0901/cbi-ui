import { Component, OnInit, Input } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-issuer-dashboard',
  templateUrl: './issuer-dashboard.component.html',
  styleUrls: ['./issuer-dashboard.component.scss'],
})
export class IssuerDashboardComponent implements OnInit {
  dashboardData: object;
  isLoading: boolean;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.isLoading = true;
    this.dashboardData = { ...this.utils.getStore('userData') };
  }
  ngOnInit(): void {
    const payload = {
      userEmail: this.dashboardData['userEmail'],
    };

    this.ds.getDashboard(payload, 'issuerDashboard').subscribe((data) => {
      this.dashboardData = data;
      this.isLoading = false;
    });
  }
}