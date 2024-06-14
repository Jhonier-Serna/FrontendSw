import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { UserModel } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private axiosInstance = axios.create({
    baseURL: 'https://auth-service-class-3.onrender.com/',
  });

  constructor() {}

  login(user: UserModel): Observable<string> {
    return from(
      this.axiosInstance
        .post<string>('/auth/login', user)
        .then((response) => response.data)
        .catch((error) => {
          console.error('Error login:', error);
          throw error;
        })
    );
  }
}
