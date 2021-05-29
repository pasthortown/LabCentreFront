import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleParamComponent } from './sampleparam.component';

const routes: Routes = [
   {
      path: '',
      component: SampleParamComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class SampleParamRoutingModule {}
