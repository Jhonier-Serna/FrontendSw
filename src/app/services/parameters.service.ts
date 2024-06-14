import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import axios from 'axios';
import { EventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class ParametersService {

  private axiosInstance = axios.create({
    baseURL: 'https://dockerlogicanegocio.onrender.com',
  });

  constructor() {}

  eventList(): Observable<EventModel[]> {
    return from(
      this.axiosInstance
        .get<EventModel[]>('/events')
        .then((response) => response.data)
        .catch((error) => {
          console.error('Error fetching event list:', error);
          throw error;
        })
    );
  }

  eventbyId(id: string): Observable<EventModel> {
    return from(
      this.axiosInstance
        .get<EventModel>(`/events/${id}`)
        .then((response) => response.data)
        .catch((error) => {
          console.error(`Error fetching event with id ${id}:`, error);
          throw error;
        })
    );
  }

  updateEvent(id: string, event: EventModel): Observable<EventModel> {
    return from(
      this.axiosInstance
        .put<EventModel>(`/events/${id}`, event)
        .then((response) => response.data)
        .catch((error) => {
          console.error(`Error fetching event with id ${id}:`, error);
          throw error;
        })
    );
  }

  saveEvent(event: EventModel): Observable<EventModel> {
    return from(
      this.axiosInstance
        .post<EventModel>('/events', event)
        .then((response) => response.data)
        .catch((error) => {
          console.error('Error saving event:', error);
          throw error;
        })
    );
  }
  deleteEvent(id: string): Observable<EventModel> {
    return from(
      this.axiosInstance
        .delete<EventModel>(`/events/${id}`)
        .then((response) => response.data)
        .catch((error) => {
          console.error(`Error fetching event with id ${id}:`, error);
          throw error;
        })
    );
  }
  findUser(id: string): Observable<any> {
    return from(
      this.axiosInstance
        .get<any>(`/users/search/${id}`)
        .then((response) => response.data)
        .catch((error) => {
          console.error(`Error fetching event with id ${id}:`, error);
          throw error;
        })
    );
  }

  bookEvent(userId: string,eventId: any): Observable<any> {
    const data = {
      "event_id": eventId,
      "user_id": userId
    }
    return from(
      this.axiosInstance
        .post<any>(`/resevations`, data)
        .then((response) => response.data)
        .catch((error) => {
          console.error(`Error fetching event with id :`, error);
          throw error;
        })
    );
  }
}
