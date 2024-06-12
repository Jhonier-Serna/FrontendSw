import { Component, AfterViewInit } from '@angular/core';
declare var M: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    var tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);
  }
}
