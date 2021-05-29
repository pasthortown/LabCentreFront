import { TemplateModule } from './template.module';

describe('TemplateModule', () => {
   let blackPageModule: TemplateModule;

   beforeEach(() => {
      blackPageModule = new TemplateModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});