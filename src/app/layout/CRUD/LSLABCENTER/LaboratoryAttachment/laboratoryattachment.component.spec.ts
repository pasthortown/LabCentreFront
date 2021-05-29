import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LaboratoryAttachmentComponent } from './laboratoryattachment.component';

describe('LaboratoryAttachmentComponent', () => {
   let component: LaboratoryAttachmentComponent;
   let fixture: ComponentFixture<LaboratoryAttachmentComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [LaboratoryAttachmentComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(LaboratoryAttachmentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});