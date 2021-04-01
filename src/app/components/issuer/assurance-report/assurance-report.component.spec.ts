import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssuranceReportComponent } from './assurance-report.component';

describe('AssuranceReportComponent', () => {
  let component: AssuranceReportComponent;
  let fixture: ComponentFixture<AssuranceReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssuranceReportComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssuranceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
