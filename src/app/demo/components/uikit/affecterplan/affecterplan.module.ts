import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AffecterPlanRoutingModule } from './affecterplan-routing.module';

import { AffecterplanComponent } from './affecterplan.component';
import { FormsModule } from '@angular/forms';
import { FormLayoutDemoRoutingModule } from '../formlayout/formlayoutdemo-routing.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";


@NgModule({
 
  imports: [
    CommonModule,
    AffecterPlanRoutingModule,
    CommonModule,
		FormsModule,
		FormLayoutDemoRoutingModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
  ],
  declarations: [AffecterplanComponent],
})
export class AffecterPlanModule { }
