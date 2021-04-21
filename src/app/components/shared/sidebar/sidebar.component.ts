import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from './../../../services/utils/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentPage: Subject<string>;
  userData: object;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.currentPage = this.ds.currentPage;
    this.userData = this.utils.getStore('userData');
  }

  ngOnInit(): void {}
}
