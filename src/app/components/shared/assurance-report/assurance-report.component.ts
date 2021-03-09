import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { DatastoreService } from 'src/app/services/data-store/data-store.service';

@Component({
  selector: 'app-assurance-report',
  templateUrl: './assurance-report.component.html',
  styleUrls: ['./assurance-report.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class AssuranceReportComponent implements OnInit {
  @Output() currentPageEvent = new EventEmitter<object>();

  pageData: object = {
    showNext: false,
    showBack: true,
    showSubmit: true,
    pageName: 'assuranceReportForm',
  };
  assuranceReportForm: FormGroup;
  caName: string;
  gbName: string;

  constructor(private fb: FormBuilder, private parent: FormGroupDirective) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.currentPageEvent.emit(this.pageData);
    });

    this.assuranceReportForm = this.fb.group({
      caAssuranceReport: this.fb.control('', [Validators.required]),
      gbAssuranceReport: this.fb.control('', [Validators.required]),
    });

    this.parent.form.addControl(
      'assuranceReportForm',
      this.assuranceReportForm
    );
  }

  onChange = (event, name) => {
    this[name] = event.target.files[0].name;
  };
}
