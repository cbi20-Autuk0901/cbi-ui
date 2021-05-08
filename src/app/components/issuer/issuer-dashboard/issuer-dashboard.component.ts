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
  userData: object;
  isLoading: boolean;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.isLoading = true;
    this.userData = this.utils.getStore('userData');
  }
  ngOnInit(): void {
    const payload = {
      userEmail: this.userData['userEmail'],
    };

    this.ds.getDashboard(payload, 'issuerDashboard').subscribe((data) => {
      this.dashboardData = data;
      this.isLoading = false;
      if (
        this.dashboardData['recentCertificationStatus'].pre !== null &&
        this.userData['userRole'] === 'singleIssuer'
      ) {
        this.utils.setStore('applicationOpen', true);
      } else {
        this.utils.setStore('applicationOpen', false);
      }
    });
  }
}
