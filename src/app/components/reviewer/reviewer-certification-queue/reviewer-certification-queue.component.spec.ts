import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewerCertificationQueueComponent } from './reviewer-certification-queue.component';

describe('ReviewerCertificationQueueComponent', () => {
  let component: ReviewerCertificationQueueComponent;
  let fixture: ComponentFixture<ReviewerCertificationQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewerCertificationQueueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewerCertificationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
