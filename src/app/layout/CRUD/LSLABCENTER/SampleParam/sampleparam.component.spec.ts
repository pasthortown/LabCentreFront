import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SampleParamComponent } from './sampleparam.component';

describe('SampleParamComponent', () => {
   let component: SampleParamComponent;
   let fixture: ComponentFixture<SampleParamComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [SampleParamComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(SampleParamComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});