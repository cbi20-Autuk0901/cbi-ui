import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreenBondComponent } from './green-bond.component';

describe('GreenBondComponent', () => {
  let component: GreenBondComponent;
  let fixture: ComponentFixture<GreenBondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreenBondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreenBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
