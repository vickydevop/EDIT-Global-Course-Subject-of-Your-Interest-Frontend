import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', loadChildren: () => import("../modules/add-edit-syllabus-of-your-Interest-app/add-edit-syllabus-of-your-Interest-app.module").then(m => m.AddEditSyllabusOfYourInterestAppModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
