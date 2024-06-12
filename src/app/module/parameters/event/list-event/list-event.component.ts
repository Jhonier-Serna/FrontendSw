import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
declare var M: any;

@Component({
  selector: 'app-list-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.css'],
})
export class ListEventComponent implements AfterViewInit {
  eventList = [
    { name: 'Andres cepeda 1' },
    { name: 'Andres cepeda 2' },
    { name: 'Andres cepeda 3' },
    { name: 'Andres cepeda 4' },
  ];

  ngAfterViewInit() {
    var tabs = document.querySelectorAll('.tabs');
    tabs.forEach((tab: Element) => {
      M.Tabs.init(tab);
    });
  }
}
