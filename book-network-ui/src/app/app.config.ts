import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { httpTokenInterceptor } from './services/interceptor/http-token.interceptor';
import { KeycloakService } from './services/keycloak/keycloak.service.js';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpTokenInterceptor])),
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true,
    },
    importProvidersFrom(HttpClientModule), // Importa HttpClientModule
  ],
};