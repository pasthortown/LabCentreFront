import { ResultModule } from './result.module';

describe('ResultModule', () => {
   let blackPageModule: ResultModule;

   beforeEach(() => {
      blackPageModule = new ResultModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});