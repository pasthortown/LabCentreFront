import { MyTemplatesPageModule } from './my-templates-page.module';

describe('MyTemplatesPageModule', () => {
  let blackPageModule: MyTemplatesPageModule;

  beforeEach(() => {
    blackPageModule = new MyTemplatesPageModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
