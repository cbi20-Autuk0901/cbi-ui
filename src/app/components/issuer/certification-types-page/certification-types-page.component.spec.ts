import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertTypesPageComponent } from './certification-types-page.component';

describe('CertTypesPageComponent', () => {
  let component: CertTypesPageComponent;
  let fixture: ComponentFixture<CertTypesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CertTypesPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
