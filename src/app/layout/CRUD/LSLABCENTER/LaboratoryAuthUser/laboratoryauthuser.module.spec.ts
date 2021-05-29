import { LaboratoryAuthUserModule } from './laboratoryauthuser.module';

describe('LaboratoryAuthUserModule', () => {
   let blackPageModule: LaboratoryAuthUserModule;

   beforeEach(() => {
      blackPageModule = new LaboratoryAuthUserModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});