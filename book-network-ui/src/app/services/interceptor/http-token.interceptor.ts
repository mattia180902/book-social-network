import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { KeycloakService } from '../keycloak/keycloak.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  const token = keycloakService.keycloak.token;

  if (token) {
      const authReq = req.clone({
          headers: new HttpHeaders({
              Authorization: `Bearer ${token}`
          }),
      });
      return next(authReq)/*.pipe(
          catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                  // Token non valido, reindirizza al login
                  keycloakService.keycloak.isTokenExpired
                  //router.navigate(['/login']);
              }
              return throwError(() => error);
          })
      );*/
  }
  return next(req);
};