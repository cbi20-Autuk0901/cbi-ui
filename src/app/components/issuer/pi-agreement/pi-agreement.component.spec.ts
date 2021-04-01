import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiAgreementComponent } from './pi-agreement.component';

describe('PiAgreementComponent', () => {
  let component: PiAgreementComponent;
  let fixture: ComponentFixture<PiAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
