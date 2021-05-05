import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewerSidebarComponent } from './reviewer-sidebar.component';

describe('ReviewerSidebarComponent', () => {
  let component: ReviewerSidebarComponent;
  let fixture: ComponentFixture<ReviewerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewerSidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
