import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLaboratoryPageComponent } from './my-laboratory-page.component';

describe('MyLaboratoryPageComponent', () => {
  let component: MyLaboratoryPageComponent;
  let fixture: ComponentFixture<MyLaboratoryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyLaboratoryPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLaboratoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
