import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Injectable()

export class SecurityInterceptor implements HttpInterceptor {
//En el constructor inyectamos el router para la navegacion
// y el securityService
// El router va a servir para la salida y entrada de, por ejemplo errores, como un 401 que lo reciba y que devueva una alerta (como de inicio de sesion, falta de permisos, etc)
  constructor(private securityService: SecurityService,
              private router: Router) { 

              }

              //Se va a tener acceso a la request y el next es para dejar pasar o no
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    //Caprutamos el usuario que contiene el token
    let theUser = this.securityService.activeUserSession
    const token = theUser["token"];

    // Si la solicitud es para la ruta de "login", no adjuntes el token

    if (request.url.includes('/login') || request.url.includes('/token-validation')) {

      console.log("no se pone token")
      return next.handle(request);

    } else {

      console.log("colocando token " + token)

      // Adjunta el token a la solicitud

      //Aqui decimos que a la request que nos llega de los ms que se clone
      const authRequest = request.clone({
        //Una vez lo clonabamos, colocamos los encabezados y ponemos la pestaña de autorization. 
        //En el encabezado colocamos el bearer y el token
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(authRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            Swal.fire({
              title: 'No está autorizado para esta operación',
              icon: 'error',
              timer: 5000

            });
            this.router.navigateByUrl('/dashboard');

          } else if (err.status === 400) {

            Swal.fire({
              title: 'Existe un error, contacte al administrador',
              icon: 'error',
              timer: 5000

            });

          }

          return new Observable<never>();

        }));

    }


    // Continúa con la solicitud modificada



  }
}
