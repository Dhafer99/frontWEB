import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffecterplanComponent } from './affecterplan.component';

const routes: Routes = [{ path: '', component: AffecterplanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffecterPlanRoutingModule { }
