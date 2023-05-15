import { User } from './../../../shared/models/user.interface';//importamos interface
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'; //
import { environment } from 'src/environments/environment';//importamos url de la api
import { catchError } from 'rxjs/operators';//
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private http: HttpClient) { }

  //TRAER TODOS LOS UAUARIOS
  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(`${environment.URL_API}/users`)
      .pipe(catchError(this.handlerError));
  }
  //TRAER USUARIO POR ID
  getById(userId: number): Observable<User> {
    return this.http
      .get<any>(`${environment.URL_API}/users/${userId}`)
      .pipe(catchError(this.handlerError));
  }
  //CREAR NUEVO USUARIO
  new(user: User): Observable<User> {
    return this.http
      .post<User>(`${environment.URL_API}/users`, user, {responseType: 'text' as 'json'})
      .pipe(catchError(this.handlerError));
  }
  //ACTUALIZAR USUARIO
  update(userId: number, user: User): Observable<User> {
    return this.http
      .patch<User>(`${environment.URL_API}/users/${userId}`, user)
      .pipe(catchError(this.handlerError));
  }
  //BORRAR USUARIO
  delete(userId: number): Observable<{}> {
    return this.http
      .delete<User>(`${environment.URL_API}/users/${userId}`)
      .pipe(catchError(this.handlerError));
  }
  //MANEJO DE ERRORES
  handlerError(error): Observable<never> {
    let errorMessage = 'Ups! ha ocurrido un error';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}

