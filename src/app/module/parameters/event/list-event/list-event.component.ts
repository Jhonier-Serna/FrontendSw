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
        setTimeout(() => this.initMaterializeComponents(), 0);
      },
      error: (err) => {
        console.error('Error fetching event list:', err);
      },
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.initMaterializeComponents(), 0);
  }

  private initMaterializeComponents() {
    const tabs = document.querySelectorAll('.tabs');
    tabs.forEach((tab: Element) => {
      if (M.Tabs.getInstance(tab) === undefined) {
        M.Tabs.init(tab);
      }
    });

    const dropdowns = document.querySelectorAll('.dropdown-trigger');
    dropdowns.forEach((dropdown: Element) => {
      if (M.Dropdown.getInstance(dropdown) === undefined) {
        M.Dropdown.init(dropdown);
      }
    });
  }
}
