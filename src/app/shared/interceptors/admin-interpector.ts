/*un interceptor inspecciona/modifica las peticiones, so lo que va de la
aplicación al servidor y tambien lo que viene del servidor a tu aplicación.
En pocas palabras, la petición y respuesta.*/
import { AuthService } from './../../pages/auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, //interfaz
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';

/*manejo de token */
/*cada vez que haya una llamada http se ejecutaran los interceptors que hayan  */

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  constructor(private authSvc: AuthService, private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes('users')) { // si se incluye users en la ruta
      //const token = this.authSvc.userValue?.token; // nos devuelve un user
      //debugger;
      // Importante: modificamos de forma inmutable, haciendo el clonado de la petición
        const userValue = this.authSvc.userValue;

      const authReq = req.clone({
        setHeaders: {
          autorizacion: userValue.token, //autorizacion: tiene que ser el mismo nombre de cabacera del back
          'Content-Type': 'application/json'
          //auth: userValue.token,
        },
        //headers: req.headers.append('autorizacion', userValue.token)
      });

      // Pasamos al siguiente interceptor de la cadena la petición modificada
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}

