import { ResultParamModule } from './resultparam.module';

describe('ResultParamModule', () => {
   let blackPageModule: ResultParamModule;

   beforeEach(() => {
      blackPageModule = new ResultParamModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});