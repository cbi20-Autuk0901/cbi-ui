import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationTypesPageComponent } from './certification-types-page.component';

describe('CertificationTypesPageComponent', () => {
  let component: CertificationTypesPageComponent;
  let fixture: ComponentFixture<CertificationTypesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CertificationTypesPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
