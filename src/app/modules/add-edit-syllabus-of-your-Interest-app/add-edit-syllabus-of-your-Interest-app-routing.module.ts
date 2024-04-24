import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditSyllabusOfYourInterestComponent } from './add-edit-syllabus-of-your-interest/add-edit-syllabus-of-your-interest.component';

const routes: Routes = [
  {path:'',redirectTo:'add-edit-syllabus-of-your-interest',pathMatch:'full'},
  {path:'add-edit-syllabus-of-your-interest',component:AddEditSyllabusOfYourInterestComponent,
  children:[]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditSyllabusOfYourInterestAppRoutingModule { }
