import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EventModel } from '../../../../models/event.model';
import { ParametersService } from '../../../../services/parameters.service';

@Component({
  selector: 'app-events-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './events-table.component.html',
  styleUrl: './events-table.component.css',
})
export class EventsTableComponent {
  eventList: EventModel[] = [];

  constructor(private parametersService: ParametersService) {}

  ngOnInit() {
    this.parametersService.eventList().subscribe({
      next: (data) => {
        this.eventList = data;
      },
      error: (err) => {
        console.error('Error fetching event list:', err);
      },
    });
  }
}
