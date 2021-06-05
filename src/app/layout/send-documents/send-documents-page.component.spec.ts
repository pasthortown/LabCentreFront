import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDocumentsPageComponent } from './send-documents-page.component';

describe('SendDocumentsPageComponent', () => {
  let component: SendDocumentsPageComponent;
  let fixture: ComponentFixture<SendDocumentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendDocumentsPageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDocumentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
