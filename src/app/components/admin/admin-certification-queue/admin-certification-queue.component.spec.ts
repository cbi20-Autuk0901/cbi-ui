import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCertificationQueueComponent } from './admin-certification-queue.component';

describe('AdminCertificationQueueComponent', () => {
  let component: AdminCertificationQueueComponent;
  let fixture: ComponentFixture<AdminCertificationQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCertificationQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCertificationQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
