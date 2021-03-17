import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { certTypesPageComponent } from './certification-types-page.component';

describe('certTypesPageComponent', () => {
  let component: certTypesPageComponent;
  let fixture: ComponentFixture<certTypesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [certTypesPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(certTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
