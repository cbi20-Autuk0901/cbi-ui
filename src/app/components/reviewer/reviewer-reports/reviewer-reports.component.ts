import { Component, OnInit } from '@angular/core';
import { DatastoreService } from '../../../services/data-store/data-store.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-reviewer-reports',
  templateUrl: './reviewer-reports.component.html',
  styleUrls: ['./reviewer-reports.component.scss'],
})
export class ReviewerReportsComponent implements OnInit {
  userData: object;
  certifications: Array<object>;
  loading: boolean = true;

  constructor(private ds: DatastoreService, private utils: UtilsService) {
    this.userData = this.utils.getStore('userData');
  }

  ngOnInit(): void {
    const payload = {
      userEmail: this.userData['userEmail'],
    };
    this.ds.getApprovedCertifications(payload).subscribe((e) => {
      this.certifications = this.utils.addIndex(e.assignedCertifications);
      this.loading = false;
    });
  }
}
