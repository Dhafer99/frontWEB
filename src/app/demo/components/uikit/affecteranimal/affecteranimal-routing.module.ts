import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffecteranimalComponent } from './affecteranimal.component';

const routes: Routes = [{ path: '', component: AffecteranimalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffecteranimalRoutingModule { }
