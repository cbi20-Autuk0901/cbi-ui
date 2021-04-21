import { Component, Input, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-reviewer-sidebar',
  templateUrl: './reviewer-sidebar.component.html',
  styleUrls: ['./reviewer-sidebar.component.scss'],
})
export class ReviewerSidebarComponent implements OnInit {
  @Input() page: string;

  constructor(private ds: DatastoreService, private utils: UtilsService) {}

  ngOnInit(): void {}
}
