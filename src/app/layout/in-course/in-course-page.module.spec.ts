import { InCoursePageModule } from './in-course-page.module';

describe('InCoursePageModule', () => {
  let blackPageModule: InCoursePageModule;

  beforeEach(() => {
    blackPageModule = new InCoursePageModule();
  });

  it('should create an instance', () => {
    expect(blackPageModule).toBeTruthy();
  });
});
