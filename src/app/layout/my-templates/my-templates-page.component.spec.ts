import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTemplatesPageComponent } from './my-templates-page.component';

describe('MyTemplatesPageComponent', () => {
  let component: MyTemplatesPageComponent;
  let fixture: ComponentFixture<MyTemplatesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyTemplatesPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTemplatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
