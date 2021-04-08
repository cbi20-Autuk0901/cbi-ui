import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from './../../../services/utils/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentPage: string;
  userData: object;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.ds.currentPage.subscribe((e) => {
      this.currentPage = e;
      console.log(e);
    });

    this.userData = this.utils.getStore('userData');
  }

  ngOnInit(): void {}
}
