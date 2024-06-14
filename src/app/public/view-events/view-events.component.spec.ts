import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ViewEventsComponent } from './view-events.component';
import { By } from '@angular/platform-browser';

describe('ViewEventsComponent', () => {
  let component: ViewEventsComponent;
  let fixture: ComponentFixture<ViewEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ViewEventsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the current month and year', () => {
    const today = new Date();
    expect(component.currentYear).toBe(today.getFullYear());
    expect(component.currentMonth).toBe(today.getMonth());
  });

  it('should generate dates for the current month', () => {
    component.generateCalendar();
    const dates = component.calendar;
    expect(dates.length).toBeGreaterThan(0);
    expect(dates[0].date.getMonth()).toBe(component.currentMonth);
  });

  it('should correctly identify today\'s date', () => {
    const today = new Date();
    expect(component.isToday(today)).toBe(true);
  });

  it('should select a date when clicked', () => {
    const date = new Date();
    component.selectDate(date);
    expect(component.selectedDate).toEqual(date);
  });

  it('should mark selected date', () => {
    const date = new Date();
    component.selectDate(date);
    fixture.detectChanges();
    const selectedElement = fixture.debugElement.query(By.css('.calendar-date.selected'));
    expect(selectedElement).toBeTruthy();
    expect(selectedElement.nativeElement.textContent).toContain(date.getDate());
  });

  it('should navigate to the previous month', () => {
    const initialMonth = component.currentMonth;
    component.prevMonth();
    expect(component.currentMonth).toBe(initialMonth === 0 ? 11 : initialMonth - 1);
  });

  it('should navigate to the next month', () => {
    const initialMonth = component.currentMonth;
    component.nextMonth();
    expect(component.currentMonth).toBe(initialMonth === 11 ? 0 : initialMonth + 1);
  });
});
