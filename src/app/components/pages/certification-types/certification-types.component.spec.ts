import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationTypesComponent } from './certification-types.component';

describe('CertificationTypesComponent', () => {
  let component: CertificationTypesComponent;
  let fixture: ComponentFixture<CertificationTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
