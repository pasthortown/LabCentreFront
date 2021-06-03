import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesOfLaboratoryComponent } from './templates-of-laboratory.component';

describe('TemplatesOfLaboratoryComponent', () => {
  let component: TemplatesOfLaboratoryComponent;
  let fixture: ComponentFixture<TemplatesOfLaboratoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatesOfLaboratoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesOfLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
