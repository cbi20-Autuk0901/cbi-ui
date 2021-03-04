import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntryPageComponent } from './form-entry-page.component';

describe('FormEntryPageComponent', () => {
  let component: FormEntryPageComponent;
  let fixture: ComponentFixture<FormEntryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEntryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEntryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
