import { Injectable } from '@angular/core';
import { UserResponse, User } from './../../shared/models/user.interface';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';//https://www.npmjs.com/package/@auth0/angular-jwt
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MessageErrorComponent } from './message-error/message-error.component';


const helper = new JwtHelperService();//instancia del metodo

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<UserResponse>(null);

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {
    this.checkToken();
  }

  get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue();
  }

  //METODO REGISTRAR
  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.URL_API}/auth/login`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user); // save token
          this.user.next(user);
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  //METODO CERRAR SESION
  logout(): void {
    localStorage.removeItem('user'); // remove token user
    this.user.next(null);
    this.router.navigate(['/login']);
    // this.router.navigate(['/']);
  }

  //METODO QUE VERIFICA TOKEN
  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;//traemos el user y lo convertimos

    if (user) {
      const expirado = helper.isTokenExpired(user.token); // verificamos si el user ha expirado
      //console.log('EXPIRED ->', expirado);
      if (expirado) { // si expirado es false, el token es valido aun
        this.logout();
      } else {
        this.user.next(user);
      }
    }
  }

  //METODO QUE GUARDA EL TOKE
  private saveLocalStorage(user: UserResponse): void {
    console.log(user);
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  //MANEJO DE ERRORES
  private handlerError(err): Observable<never> {
    const dialogRef = this.dialog.open(MessageErrorComponent, {
      width: '400px',
      data: '',
    });
    dialogRef.afterClosed().subscribe();
    return throwError('');
  }

}

