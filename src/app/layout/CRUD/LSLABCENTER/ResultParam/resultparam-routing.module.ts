import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultParamComponent } from './resultparam.component';

const routes: Routes = [
   {
      path: '',
      component: ResultParamComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class ResultParamRoutingModule {}
