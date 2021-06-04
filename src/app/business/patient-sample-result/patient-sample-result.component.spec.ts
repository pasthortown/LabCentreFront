import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSampleResultComponent } from './patient-sample-result.component';

describe('PatientSampleResultComponent', () => {
  let component: PatientSampleResultComponent;
  let fixture: ComponentFixture<PatientSampleResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSampleResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSampleResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
