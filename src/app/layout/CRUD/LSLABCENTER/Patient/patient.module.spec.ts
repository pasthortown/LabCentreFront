import { PatientModule } from './patient.module';

describe('PatientModule', () => {
   let blackPageModule: PatientModule;

   beforeEach(() => {
      blackPageModule = new PatientModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});