import { UserResponse } from './../../models/user.interface';
import { UtilsService } from './../../services/utils.service';
import { AuthService } from './../../../pages/auth/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseFormUser } from '../../utils/base-form-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAdmin = null;
  isLogged = true; //propiedad de boton registrarse <-> cerrar

  private destroy$ = new Subject<any>(); // para desuscripcion del observable

  //evento personalizado
  @Output() AlternarNavegacionLateral = new EventEmitter<void>();//instancia del evento

  constructor(
    private AuthSvc: AuthService,
    private utilsSvc: UtilsService,
    public loginForm: BaseFormUser) { }

  /*isLogged=false --> cerrar sesion
    isLogged=true --> iniciar sesion */
  ngOnInit(): void {
    this.AuthSvc.user$
      .pipe(takeUntil(this.destroy$))// deja de emitir hasta que se le diga que emita
      .subscribe((user: UserResponse) => { // cuando se subscriba al observable de user devolvera un user
        this.isLogged = false;// seteamos a false(cerrarsesion) si devuelve un user, de lo contrario el observavble no devuelve nada
        this.isAdmin = user?.role;// se asigna el rol que tenga ese usuario
        if (!user) { // si no hay un usuario setea logged a true(inciar sesion)
          this.isLogged = true;
        }
        else if (this.isAdmin == 'admin') {
          this.utilsSvc.openSidebar(true);
        }
      });
  }

  //LOS OBSERVABLES DEBEN DESUSCRIBIRSE PARA EVITAR CONSUMO DE RECURSOS
  ngOnDestroy(): void {
    //this.subcripciones.unsubscribe();
    this.destroy$.next({}); // aprouch del subject
    this.destroy$.complete();
  }

  //DESPLEGAR NAVEGACION LATERAL
  NavegacionLaterial() {
    this.AlternarNavegacionLateral.emit(); // se emite el evento personal
  }

  //CERRAR SESION
  cerrarSesion(): void {
    this.AuthSvc.logout();
    this.utilsSvc.openSidebar(false);
    this.isLogged = true;// para mostrar boton 'iniciar sesion'
    this.loginForm.baseForm.reset();
  }

}
