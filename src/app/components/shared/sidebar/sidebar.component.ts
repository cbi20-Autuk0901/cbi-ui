import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentPage: string;
  constructor(private ds: DatastoreService) {
    this.ds.currentPage.subscribe((e) => {
      this.currentPage = e;
      console.log(e);
    });
  }

  ngOnInit(): void {}
}
