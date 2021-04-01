import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtInstrumentPageComponent } from './debt-instrument-page.component';

describe('DebtInstrumentPageComponent', () => {
  let component: DebtInstrumentPageComponent;
  let fixture: ComponentFixture<DebtInstrumentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebtInstrumentPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtInstrumentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
