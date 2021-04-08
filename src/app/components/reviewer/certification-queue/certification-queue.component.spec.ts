import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationQueueComponent } from './certification-queue.component';

describe('CertificationQueueComponent', () => {
  let component: CertificationQueueComponent;
  let fixture: ComponentFixture<CertificationQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificationQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
