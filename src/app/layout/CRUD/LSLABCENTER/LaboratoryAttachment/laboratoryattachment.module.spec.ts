import { LaboratoryAttachmentModule } from './laboratoryattachment.module';

describe('LaboratoryAttachmentModule', () => {
   let blackPageModule: LaboratoryAttachmentModule;

   beforeEach(() => {
      blackPageModule = new LaboratoryAttachmentModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});