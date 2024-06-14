import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ParametersService } from '../../services/parameters.service';
import { EventModel } from '../../models/event.model';

@Component({
  selector: 'app-delete-schedule-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-schedule-event.component.html',
  styleUrl: './delete-schedule-event.component.css',
})
export class DeleteScheduleEventComponent {
  eventList: EventModel[] = [];

  constructor(private parametersService: ParametersService) {}

  ngOnInit() {
    const ls = localStorage.getItem('userData');

    if (ls) {
      const userData = JSON.parse(ls);
      const userId = userData.id;

      this.parametersService.myEvents(userId).subscribe({
        next: (data) => {
          this.eventList = data;
        },
        error: (err) => {
          console.error('Error fetching event list:', err);
        },
      });
    }
  }
}
