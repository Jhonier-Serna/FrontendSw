import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  FormBuild() {
    this.fGroup = this.fb.group({
      eventName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      date: ['', [Validators.required]],
      places: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      place: ['', [Validators.required]],
      entityInCharge: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
}
