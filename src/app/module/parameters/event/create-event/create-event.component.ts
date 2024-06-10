import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css',
})
export class CreateEventComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.FormBuild();
  }

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

  saveEvent() {
    if (this.fGroup.invalid) {
      alert('Incorrect data');
    } else {
      alert('Save event');
    }
  }

  get getformGroup() {
    return this.fGroup.controls;
  }
}
