import { UserProfileModule } from './userprofile.module';

describe('UserProfileModule', () => {
   let blackPageModule: UserProfileModule;

   beforeEach(() => {
      blackPageModule = new UserProfileModule();   });

   it('should create an instance', () => {
      expect(blackPageModule).toBeTruthy();
   });
});