import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import axios from 'axios';
import { EventModel } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class ParametersService {
  private axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
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
}
