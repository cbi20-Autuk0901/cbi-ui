import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateBondInformationComponent } from './climate-bond-information.component';

describe('ClimateBondInformationComponent', () => {
  let component: ClimateBondInformationComponent;
  let fixture: ComponentFixture<ClimateBondInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimateBondInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimateBondInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
