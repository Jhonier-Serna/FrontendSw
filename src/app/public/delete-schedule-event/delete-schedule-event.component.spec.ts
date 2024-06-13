import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScheduleEventComponent } from './delete-schedule-event.component';

describe('DeleteScheduleEventComponent', () => {
  let component: DeleteScheduleEventComponent;
  let fixture: ComponentFixture<DeleteScheduleEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteScheduleEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteScheduleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
