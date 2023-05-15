import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { MaterialModule } from './../../../material.module'; // se importa el modulo de material
import { RouterModule } from '@angular/router' // importamos modulo

import { UtilsService } from './../../services/utils.service';


@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [SidebarComponent], // se exporta el componente para que otros modulos de la aplicacion lo puedan utilizar
  providers: [UtilsService] // inyectamos el servicio utils
})
export class SidebarModule { }
