import { SampleModule } from './sample.module';

describe('SampleModule', () => {
   let blackPageModule: SampleModule;

   beforeEach(() => {
      blackPageModule = new SampleModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});