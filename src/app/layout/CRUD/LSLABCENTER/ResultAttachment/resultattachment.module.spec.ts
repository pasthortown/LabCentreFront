import { ResultAttachmentModule } from './resultattachment.module';

describe('ResultAttachmentModule', () => {
   let blackPageModule: ResultAttachmentModule;

   beforeEach(() => {
      blackPageModule = new ResultAttachmentModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});