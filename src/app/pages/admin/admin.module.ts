import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { MaterialModule } from './../../material.module';
import { ModalComponent } from './components/modal/modal.component';//mudulos de angular material
//
import { ReactiveFormsModule } from '@angular/forms';//modulo para formularios reactivos

import { MatTableModule } from '@angular/material/table';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [AdminComponent, ModalComponent, ConfirmationDialogComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,

  ]
})
export class AdminModule { }
