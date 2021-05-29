import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultAttachmentComponent } from './resultattachment.component';

describe('ResultAttachmentComponent', () => {
   let component: ResultAttachmentComponent;
   let fixture: ComponentFixture<ResultAttachmentComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ResultAttachmentComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ResultAttachmentComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});