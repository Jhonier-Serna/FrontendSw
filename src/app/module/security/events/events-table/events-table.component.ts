import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EventModel } from '../../../../models/event.model';
import { ParametersService } from '../../../../services/parameters.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../../../../public/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';

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
    private router: Router,
    private dialog: MatDialog
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

  deleteEvent(eventId: any) {
    this.parametersService.deleteEvent(eventId).subscribe({
      next: (data) => {
        const dialogData = {
          imageSrc:
            'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/assets%2Fr9BK4XzQ.png?alt=media&token=7f73b923-1f9f-46c2-8041-60dc35c2a5b2',
          message: 'Evento eliminado con éxito',
          message2: 'Gracias!',
        };
        this.dialog.open(ModalComponent, { data: dialogData });
      },
      error: (err) => {
        const dialogData = {
          imageSrc:
          'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/assets%2FboMCMJTh.png?alt=media&token=e8d41b61-9979-4cab-8c19-3c7cb489b72a',
          message: 'No se pudo eliminar el evento',
          message2: 'Reintentar',
        };
        this.dialog.open(ModalComponent, { data: dialogData });
      },
    });
  }
}
