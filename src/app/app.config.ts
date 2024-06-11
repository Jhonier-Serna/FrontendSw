import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'manizalesinteligente',
        appId: '1:1074635180774:web:8fb82b0171abb6cf9b0927',
        storageBucket: 'manizalesinteligente.appspot.com',
        apiKey: 'AIzaSyBgxlINPYMqV5RyeFIOBQ4bX1lCs88XfL0',
        authDomain: 'manizalesinteligente.firebaseapp.com',
        messagingSenderId: '1074635180774',
        measurementId: 'G-MGCJPWQB8P',
      })
    ),
    provideStorage(() => getStorage()),
  ],
};
