import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssuerReportsComponent } from './issuer-reports.component';

describe('IssuerReportsComponent', () => {
  let component: IssuerReportsComponent;
  let fixture: ComponentFixture<IssuerReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssuerReportsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
