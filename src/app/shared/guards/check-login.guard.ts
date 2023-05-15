import { UserResponse } from './../models/user.interface';
import { AuthService } from '../../pages/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

/*guards controlan las rutas de navegación entre páginas de la
 aplicación web, permitiendo o denegando el acceso por ejemplo. */

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authSvc: AuthService) { }

  //Metodo devuelve true o false
  canActivate(): Observable<boolean> { // Canactivate para indicar si un usuario puede acceder a una ruta o no
/*     return this.authSvc.user$.pipe(
      take(1), //operador rxjs, emite el primer valor del observable
      map((isLogged: boolean) => !isLogged)// si es false puede acceder a la ruta, de lo contrario no
    ); */

    return this.authSvc.user$.pipe(
      take(1),
      map((user: UserResponse) => (!user ? true : false))// devuelve true o false
    );
  }
}


