import { MyLaboratoryPageModule } from './my-laboratory-page.module';

describe('MyLaboratoryPageModule', () => {
  let blackPageModule: MyLaboratoryPageModule;

  beforeEach(() => {
    blackPageModule = new MyLaboratoryPageModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
