import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { UserModel } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    // https://auth-service-class-3.onrender.com/
  });

  constructor() {}

  // eventList(): Observable<UserModel[]> {
  //   return from(
  //     this.axiosInstance
  //       .get<EventModel[]>('/events')
  //       .then((response) => response.data)
  //       .catch((error) => {
  //         console.error('Error fetching event list:', error);
  //         throw error;
  //       })
  //   );
  // }

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
