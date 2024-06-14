import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ParametersService } from '../../../../services/parameters.service';
import { EventModel } from '../../../../models/event.model';
declare var M: any;

@Component({
  selector: 'app-list-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css'],
})
export class ListEventComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit() {
    const tabs = document.querySelectorAll('.tabs');
    tabs.forEach((tab: Element) => {
      M.Tabs.init(tab);
    });
  }
}
