import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from '../token/token.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const token = tokenService.token;

  if (token) {
      const authReq = req.clone({
          headers: new HttpHeaders({
              Authorization: 'Bearer ' + token,
          }),
      });
      return next(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                  // Token non valido, reindirizza al login
                  tokenService.isTokenValid
                  //router.navigate(['/login']);
              }
              return throwError(() => error);
          })
      );
  }

  return next(req);
};