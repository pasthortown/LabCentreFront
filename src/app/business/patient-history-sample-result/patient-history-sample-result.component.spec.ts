import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHistorySampleResultComponent } from './patient-history-sample-result.component';

describe('PatientHistorySampleResultComponent', () => {
  let component: PatientHistorySampleResultComponent;
  let fixture: ComponentFixture<PatientHistorySampleResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientHistorySampleResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHistorySampleResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
