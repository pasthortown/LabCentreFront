import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultParamComponent } from './resultparam.component';

describe('ResultParamComponent', () => {
   let component: ResultParamComponent;
   let fixture: ComponentFixture<ResultParamComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [ResultParamComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ResultParamComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});