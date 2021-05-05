import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationAgreementComponent } from './certification-agreement.component';

describe('CertificationAgreementComponent', () => {
  let component: CertificationAgreementComponent;
  let fixture: ComponentFixture<CertificationAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificationAgreementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
