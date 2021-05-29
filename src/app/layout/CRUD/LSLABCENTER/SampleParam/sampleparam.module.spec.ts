import { SampleParamModule } from './sampleparam.module';

describe('SampleParamModule', () => {
   let blackPageModule: SampleParamModule;

   beforeEach(() => {
      blackPageModule = new SampleParamModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});