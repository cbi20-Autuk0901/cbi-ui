import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DatastoreService } from '../../../services/data-store/data-store.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentPage: Subject<string>;
  constructor(private ds: DatastoreService) {
    this.currentPage = this.ds.currentPage;
  }

  ngOnInit(): void {}
}
