import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InCoursePageComponent } from './in-course-page.component';

describe('InCoursePageComponent', () => {
  let component: InCoursePageComponent;
  let fixture: ComponentFixture<InCoursePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InCoursePageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
