import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerReportsComponent } from './reviewer-reports.component';

describe('ReviewerReportsComponent', () => {
  let component: ReviewerReportsComponent;
  let fixture: ComponentFixture<ReviewerReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewerReportsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
