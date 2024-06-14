import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventModel } from '../../../../models/event.model';
import { ParametersService } from '../../../../services/parameters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.css'],
})
export class EventsTableComponent implements OnInit {
  eventList: EventModel[] = [];

  constructor(
    private parametersService: ParametersService,
    private router: Router
  ) {}

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
