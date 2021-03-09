import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DatastoreService } from 'src/app/services/data-store/data-store.service';

@Component({
  selector: 'app-debt-instrument-page',
  templateUrl: './debt-instrument-page.component.html',
  styleUrls: ['./debt-instrument-page.component.scss'],
})
export class DebtInstrumentPageComponent implements OnInit {
  currentForm: number;
  pageData: object;
  diForm: FormGroup;
  constructor(private fb: FormBuilder, private ds: DatastoreService) {
    this.currentForm = 1;
    this.diForm = new FormGroup({});
  }

  ngOnInit(): void {}

  switchForm = (type: string) => {
    if (type === 'next' && this.currentForm < 3) {
      ++this.currentForm;
    }
    if (type === 'back' && this.currentForm > 1) {
      --this.currentForm;
    }
  };

  getPageInfo = (data: object) => {
    this.pageData = data;
  };

  saveFormStatus = (page: string) => {
    this.ds.formSave(this.diForm.value[page]).subscribe((e) => {
      alert('Data Saved');
    });
  };
}
