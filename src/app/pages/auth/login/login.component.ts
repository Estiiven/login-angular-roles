
import { AuthService } from './../auth.service'; //servicio
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BaseFormUser } from './../../../shared/utils/base-form-user'; //importamos la clase de validaciones

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isAdmin = null;

  hide = true;//visibilidad de contraseña
  private suspcripciones: Subscription = new Subscription(); // para descruscripcion del metodo

  constructor(
    private AuthService: AuthService,
    private router: Router,
    public loginForm: BaseFormUser) {
  }
  //METODO QUE SE EJECUTA APENAS SE ABRE LA APLICACION
  ngOnInit(): void {
    this.loginForm.baseForm.get('role').setValidators(null);//desvalidamos el campo rol ya que no es necesario para loggearse
    this.loginForm.baseForm.get('role').updateValueAndValidity();
  }
  //DESUSCRIPCION
  ngOnDestroy(): void {
    this.suspcripciones.unsubscribe();
  }
  //REGISTRAR
  onLogin(): void {
    if (this.loginForm.baseForm.invalid) {//solicitud realizada solamente cuando el formulario sea valido
      return;
    }
    const formValue = this.loginForm.baseForm.value; // instancia del formulario
    this.suspcripciones.add( // arropamos la susbcripcion
      this.AuthService.login(formValue).subscribe((res) => {
        if (res) {
          this.isAdmin = res?.role;//guardo el rol en isAdmin
          if(this.isAdmin === 'admin'){
            this.router.navigate(['/admin']);
          }
          else if(this.isAdmin === 'suscriptor'){
            this.router.navigate(['/suscriptor']);
          }
        }
      })
    );
  }
  //VALIDACIONES DE CAMPOS
  examinarCampo(campo: string): boolean {
    return this.loginForm.isValidField(campo);
  }
}
