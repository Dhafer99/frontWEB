import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Users2Component } from './users2.component';




@NgModule({
  imports: [RouterModule.forChild([
		{ path: '', component: Users2Component }
	])],
  exports: [RouterModule]
})
export class Users2RoutingModule { }
