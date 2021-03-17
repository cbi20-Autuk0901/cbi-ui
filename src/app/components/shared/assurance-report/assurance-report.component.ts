import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-assurance-report',
  templateUrl: './assurance-report.component.html',
  styleUrls: ['./assurance-report.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class AssuranceReportComponent implements OnInit {
  @Input() mainData:object;
  @Output() currentPageEvent = new EventEmitter<object>();

  pageData: object = {
    showNext: false,
    showBack: true,
    showSubmit: true,
    pageName: 'arForm',
  };
  arForm: FormGroup;
  caName: string;
  gbName: string;

  constructor(private fb: FormBuilder, private parent: FormGroupDirective) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.currentPageEvent.emit(this.pageData);
    });

    this.arForm = this.fb.group({
      caAssuranceReport: this.fb.control(null, [Validators.required]),
      gbAssuranceReport: this.fb.control(null, [Validators.required]),
    });

    this.parent.form.addControl('arForm', this.arForm);
  }

  onChange = (event, name) => {
    this[name] = event.target.files[0].name;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const currentControl =
        name === 'caName' ? 'caAssuranceReport' : 'gbAssuranceReport';
      this.arForm.patchValue({ [currentControl]: file });
    }
  };
}
