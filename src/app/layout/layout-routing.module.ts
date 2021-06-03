import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         {
            path: '',
            redirectTo: 'main'
         },
         {
            path: 'main',
            loadChildren: './main/main.module#MainModule'
         },
         {
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule'
         },

         //LSLabCenter

         {
            path: 'patient',
            loadChildren: './CRUD/LSLABCENTER/Patient/patient.module#PatientModule'
         },
         {
            path: 'sample',
            loadChildren: './CRUD/LSLABCENTER/Sample/sample.module#SampleModule'
         },
         {
            path: 'sample_param',
            loadChildren: './CRUD/LSLABCENTER/SampleParam/sampleparam.module#SampleParamModule'
         },
         {
            path: 'result',
            loadChildren: './CRUD/LSLABCENTER/Result/result.module#ResultModule'
         },
         {
            path: 'result_attachment',
            loadChildren: './CRUD/LSLABCENTER/ResultAttachment/resultattachment.module#ResultAttachmentModule'
         },
         {
            path: 'laboratory',
            loadChildren: './CRUD/LSLABCENTER/Laboratory/laboratory.module#LaboratoryModule'
         },
         {
            path: 'laboratory_attachment',
            loadChildren: './CRUD/LSLABCENTER/LaboratoryAttachment/laboratoryattachment.module#LaboratoryAttachmentModule'
         },
         {
            path: 'laboratory_auth_user',
            loadChildren: './CRUD/LSLABCENTER/LaboratoryAuthUser/laboratoryauthuser.module#LaboratoryAuthUserModule'
         },
         {
            path: 'user_profile',
            loadChildren: './CRUD/LSLABCENTER/UserProfile/userprofile.module#UserProfileModule'
         },
         {
            path: 'account-profile',
            loadChildren: './CRUD/LSLABCENTER/Profile/profile.module#ProfileModule'
         },
         {
            path: 'template',
            loadChildren: './CRUD/LSLABCENTER/Template/template.module#TemplateModule'
         },
         {
            path: 'my-laboratory',
            loadChildren: './my-laboratory/my-laboratory-page.module#MyLaboratoryPageModule'
         },
         {
            path: 'my-templates',
            loadChildren: './my-templates/my-templates-page.module#MyTemplatesPageModule'
         },
         {
            path: 'blank',
            loadChildren: './blank-page/blank-page.module#BlankPageModule'
         },
         {
            path: 'not-found',
            loadChildren: './not-found/not-found.module#NotFoundModule'
         },
         {
            path: '**',
            redirectTo: 'not-found'
         }
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule {}