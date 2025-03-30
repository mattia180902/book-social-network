import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  
  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isTokenExpired(): boolean {
    const token = this.token;

    if (!token) {
      return true; // Token non presente, quindi considerato scaduto
    }

    try {
      const payload = this.decodeToken(token);
      const expiry = payload.exp * 1000; // Converti in millisecondi
      return Date.now() >= expiry;
    } catch (error) {
      console.error('Errore durante la verifica della scadenza del token:', error);
      return true; // Errore durante la decodifica, considera il token scaduto per sicurezza
    }
  }

  constructor() {
    this.checkAndRemoveExpiredToken();
  }

  public checkAndRemoveExpiredToken(): void {
    if (this.isTokenExpired()) {
      this.removeToken();
    }
  }

  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  isTokenValid() {
    const token = this.token
    if (!token) {
      return false;
    }
    //decode the token
    const jwtHelper: JwtHelperService = new JwtHelperService();
    //check expiry date
    const isTokenExpired: boolean | Promise<boolean> = jwtHelper.isTokenExpired(token)
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }
}