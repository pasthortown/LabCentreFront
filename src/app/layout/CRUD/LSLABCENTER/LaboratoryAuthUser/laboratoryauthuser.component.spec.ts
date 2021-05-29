import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LaboratoryAuthUserComponent } from './laboratoryauthuser.component';

describe('LaboratoryAuthUserComponent', () => {
   let component: LaboratoryAuthUserComponent;
   let fixture: ComponentFixture<LaboratoryAuthUserComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         declarations: [LaboratoryAuthUserComponent]
      }).compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(LaboratoryAuthUserComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});