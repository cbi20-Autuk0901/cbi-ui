import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondRedemptionComponent } from './bond-redemption.component';

describe('BondRedemptionComponent', () => {
  let component: BondRedemptionComponent;
  let fixture: ComponentFixture<BondRedemptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BondRedemptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BondRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
