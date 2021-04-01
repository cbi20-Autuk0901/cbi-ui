import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-issuer-dashboard',
  templateUrl: './issuer-dashboard.component.html',
  styleUrls: ['./issuer-dashboard.component.scss'],
})
export class IssuerDashboardComponent implements OnInit {
  @Input() dashboardData: object;

  constructor() {}

  ngOnInit(): void {}
}
