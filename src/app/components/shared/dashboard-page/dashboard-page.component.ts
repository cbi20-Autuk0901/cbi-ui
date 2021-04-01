import { Component, OnInit } from '@angular/core';
import { UtilsService } from './../../../services/utils/utils.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  userRole: string;

  constructor(private utils: UtilsService) {
    const userData = this.utils.getStore('userData');
    this.userRole = userData['userRole'];
  }
  ngOnInit(): void {}
}
