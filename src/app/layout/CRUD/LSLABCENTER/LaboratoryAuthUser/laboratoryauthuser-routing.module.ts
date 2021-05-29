import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaboratoryAuthUserComponent } from './laboratoryauthuser.component';

const routes: Routes = [
   {
      path: '',
      component: LaboratoryAuthUserComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LaboratoryAuthUserRoutingModule {}
