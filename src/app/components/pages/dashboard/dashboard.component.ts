import { Component, OnInit } from '@angular/core';
import { DataStoreService } from '../../../services/data-store/data-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  testVal = 'dfdf';

  constructor(private ds: DataStoreService) {
    this.ds.setItem('currentPage', 'test');
  }
  ngOnInit(): void {
    this.ds.getStore().subscribe((store) => {
      this.testVal = store.currentPage;
    });
  }

  test = () => {
    this.ds.setItem('currentPage', 'dashboard');
    this.ds.getStore().subscribe((store) => {
      this.testVal = store.currentPage;
    });
  };
}
