import { Component, Input, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-issuer-sidebar',
  templateUrl: './issuer-sidebar.component.html',
  styleUrls: ['./issuer-sidebar.component.scss'],
})
export class IssuerSidebarComponent implements OnInit {
  @Input() page: string;

  constructor(private ds: DatastoreService, private utils: UtilsService) {}

  ngOnInit(): void {}
}
