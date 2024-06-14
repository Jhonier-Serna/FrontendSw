import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParametersService } from '../../services/parameters.service';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ViewEventsComponent {
  currentYear = new Date().getFullYear();
  currentMonth = new Date().getMonth();
  today = new Date();
  selectedDate: Date = new Date();
  selectedCategory: string = '';

  filters = [
    'Musica',
    'Gastronomía',
    'Deporte',
    'Infantil',
    'Familiar',
    'Teatro',
    'Aforo disponible',
  ];
  appliedFilters: string[] = [];

  monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  days = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
  calendar: { date: Date; currentMonth: boolean }[] = [];

  constructor(private parametersService: ParametersService) {
    this.generateCalendar();
  }

  generateCalendar() {
    this.calendar = [];
    let start = new Date(this.currentYear, this.currentMonth, 1);
    let end = new Date(this.currentYear, this.currentMonth + 1, 0);

    let startDay = start.getDay();
    if (startDay > 0) {
      let prevMonthEnd = new Date(this.currentYear, this.currentMonth, 0);
      for (let i = startDay - 1; i >= 0; i--) {
        this.calendar.unshift({
          date: new Date(
            prevMonthEnd.getFullYear(),
            prevMonthEnd.getMonth(),
            prevMonthEnd.getDate() - i
          ),
          currentMonth: false,
        });
      }
    }

    for (let i = 1; i <= end.getDate(); i++) {
      this.calendar.push({
        date: new Date(this.currentYear, this.currentMonth, i),
        currentMonth: true,
      });
    }

    let endDay = end.getDay();
    if (endDay < 6) {
      for (let i = 1; i <= 6 - endDay; i++) {
        this.calendar.push({
          date: new Date(this.currentYear, this.currentMonth + 1, i),
          currentMonth: false,
        });
      }
    }
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  selectDate(date: Date) {
    this.selectedDate = date;
  }

  isSelected(date: Date) {
    return this.selectedDate && date.getTime() === this.selectedDate.getTime();
  }

  isToday(date: Date) {
    return date.toDateString() === this.today.toDateString();
  }

  applyFilters() {
    const formattedDate = `${this.selectedDate.getDate()} ${
      this.monthNames[this.selectedDate.getMonth()]
    } ${this.selectedDate.getFullYear()}`;
    console.log('Filters applied:', this.appliedFilters[0]);
    console.log('Selected date:', formattedDate);

    // this.parametersService.searchList().subscribe({
    //   next: (data) => {
    //     this.eventList = data;
    //     setTimeout(() => this.initMaterializeComponents(), 0);
    //   },
    //   error: (err) => {
    //     console.error('Error fetching event list:', err);
    //   },
  }

  applyFilter() {
    if (
      this.selectedCategory &&
      !this.appliedFilters.includes(this.selectedCategory)
    ) {
      this.appliedFilters.push(this.selectedCategory);
    }
    this.selectedCategory = '';
  }

  onYearChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newYear = parseInt(target.value, 10);
    if (!isNaN(newYear)) {
      this.currentYear = newYear;
      this.generateCalendar();
    }
  }

  onMonthChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newMonth = parseInt(target.value, 10);
    if (!isNaN(newMonth)) {
      this.currentMonth = newMonth;
      this.generateCalendar();
    }
  }
}
