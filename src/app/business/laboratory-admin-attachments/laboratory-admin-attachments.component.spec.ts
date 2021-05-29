import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryAdminAttachmentsComponent } from './laboratory-admin-attachments.component';

describe('LaboratoryAdminAttachmentsComponent', () => {
  let component: LaboratoryAdminAttachmentsComponent;
  let fixture: ComponentFixture<LaboratoryAdminAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryAdminAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryAdminAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
