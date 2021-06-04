import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientNewSampleResultComponent } from './patient-new-sample-result.component';

describe('PatientNewSampleResultComponent', () => {
  let component: PatientNewSampleResultComponent;
  let fixture: ComponentFixture<PatientNewSampleResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientNewSampleResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientNewSampleResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
