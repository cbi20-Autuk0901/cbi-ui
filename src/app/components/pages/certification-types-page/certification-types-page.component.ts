import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-certification-types-page',
  templateUrl: './certification-types-page.component.html',
  styleUrls: ['./certification-types-page.component.scss'],
})
export class CertificationTypesPageComponent implements OnInit {
  userSelection: string = 'sdsds';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userSelection = params['select'];
    });
  }
}
