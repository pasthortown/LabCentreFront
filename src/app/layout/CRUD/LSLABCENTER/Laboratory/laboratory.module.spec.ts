import { LaboratoryModule } from './laboratory.module';

describe('LaboratoryModule', () => {
   let blackPageModule: LaboratoryModule;

   beforeEach(() => {
      blackPageModule = new LaboratoryModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});