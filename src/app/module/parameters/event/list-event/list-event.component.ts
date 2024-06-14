import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ParametersService } from '../../../../services/parameters.service';
import { ModalComponent } from '../../../../public/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(
    private parametersService: ParametersService,
    private dialog: MatDialog
  ) {}

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

  bookEvent(eventId: any) {
    const ls = localStorage.getItem('userData');

    if (ls) {
      const userData = JSON.parse(ls);
      const userId = userData.id;

      if (userId) {
        this.parametersService.bookEvent(userId, eventId).subscribe({
          next: (data) => {
            const dialogData = {
              imageSrc:
                'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/assets%2Fr9BK4XzQ.png?alt=media&token=7f73b923-1f9f-46c2-8041-60dc35c2a5b2',
              message: 'Evento reservado con éxito',
              message2: 'Gracias!',
            };
            this.dialog.open(ModalComponent, { data: dialogData });
          },
          error: (err) => {
            const dialogData = {
              imageSrc:
                'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/assets%2FboMCMJTh.png?alt=media&token=e8d41b61-9979-4cab-8c19-3c7cb489b72a',
              message: 'No se pudo reservar el evento',
              message2: 'Reintentar',
            };
            this.dialog.open(ModalComponent, { data: dialogData });
          },
        });
      } else {
        const dialogData = {
          imageSrc:
            'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/assets%2FboMCMJTh.png?alt=media&token=e8d41b61-9979-4cab-8c19-3c7cb489b72a',
          message: 'No se encontró el usuario',
          message2: 'Por favor inicie sesión',
        };
        this.dialog.open(ModalComponent, { data: dialogData });
      }
    }
  }
}
