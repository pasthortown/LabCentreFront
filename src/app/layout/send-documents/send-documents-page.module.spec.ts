import { SendDocumentsPageModule } from './send-documents-page.module';

describe('SendDocumentsPageModule', () => {
  let blackPageModule: SendDocumentsPageModule;

  beforeEach(() => {
    blackPageModule = new SendDocumentsPageModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
