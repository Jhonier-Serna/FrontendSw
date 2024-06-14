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
                'https://uc923483daef064c1e5e5423d1b0.previews.dropboxusercontent.com/p/thumb/ACSfwGQCITIrb_8c73GPh0LhrcQsmye1odFHjs7144Mz0u9jByuZvm2BGPVulitxeZGwWdxoMwNppkvl1cLcmhloWc7IkMH7MnicSyxdh_DOerh2gaRiPslYw2LHkQcqpnmVzR33blTC1yGRVquahiIjatEdX0g871FmyI5-wMvqG760jH0Mp1D_SsDH4DPDQdA_L7BybKWmhQb8Gaw2lf-xLdLKDMv6RZ9z1nwgTSPdVmrji1E53vekQwqdps5-Tl8AVJG4yFE4cZ8EIVWTNTCJTtmMMTVgfVX4dBmngX9n38DhEvyHMGQQt3GzOYa3PM4hgAYF01-ybDU2_noamMwtmk-7IH4MBym1G6Rcd6dl9JZ93qvz97Gk9uzVLuj9TSc/p.png',
              message: 'Evento reservado con éxito',
              message2: 'Gracias!',
            };
            this.dialog.open(ModalComponent, { data: dialogData });
          },
          error: (err) => {
            const dialogData = {
              imageSrc:
                'https://ucb3975a9b09efbd37ce9fccaf1e.previews.dropboxusercontent.com/p/thumb/ACRJITIMMfFZypkn7tLz_uda0dmaMv_FbFMUXitkfLaaGQ4Ztf1TJ3Hs41VwpB26p5-8RqBzmw4xqTFQLdPPL8wJo3b9MgGxo3RB88jCVjsoS3eape16gKcXYrdFVp6tUEX7ZssF-zl0z1N-j8lFGaPthggVHXOA4IiXLWuiI8YwPspIW7CaH1Yi6totz7ahOHvkEXQQIk4JaewS6s21LTikqFVbnhsh5C1hXehac29y2RVgZ1SY4IGEcJ5iX8NlyuwZ4snwF2nkEApdIKi_0BIMs6MHGRKOlLisdvmLBlre-ii-d9O-UQjK8xofFKS0V58QQ2ITwdC4sZR6ZAahbLifB7TPywIvn4zJO7ItSUHATPUBLGN8SWK--iJzS3eZr04/p.png',
              message: 'No se pudo reservar el evento',
              message2: 'Reintentar',
            };
            this.dialog.open(ModalComponent, { data: dialogData });
          },
        });
      } else {
        const dialogData = {
          imageSrc:
            'https://ucb3975a9b09efbd37ce9fccaf1e.previews.dropboxusercontent.com/p/thumb/ACRJITIMMfFZypkn7tLz_uda0dmaMv_FbFMUXitkfLaaGQ4Ztf1TJ3Hs41VwpB26p5-8RqBzmw4xqTFQLdPPL8wJo3b9MgGxo3RB88jCVjsoS3eape16gKcXYrdFVp6tUEX7ZssF-zl0z1N-j8lFGaPthggVHXOA4IiXLWuiI8YwPspIW7CaH1Yi6totz7ahOHvkEXQQIk4JaewS6s21LTikqFVbnhsh5C1hXehac29y2RVgZ1SY4IGEcJ5iX8NlyuwZ4snwF2nkEApdIKi_0BIMs6MHGRKOlLisdvmLBlre-ii-d9O-UQjK8xofFKS0V58QQ2ITwdC4sZR6ZAahbLifB7TPywIvn4zJO7ItSUHATPUBLGN8SWK--iJzS3eZr04/p.png',
          message: 'No se encontró el usuario',
          message2: 'Por favor inicie sesión',
        };
        this.dialog.open(ModalComponent, { data: dialogData });
      }
    } else {
      const dialogData = {
        imageSrc:
          'https://ucb3975a9b09efbd37ce9fccaf1e.previews.dropboxusercontent.com/p/thumb/ACRJITIMMfFZypkn7tLz_uda0dmaMv_FbFMUXitkfLaaGQ4Ztf1TJ3Hs41VwpB26p5-8RqBzmw4xqTFQLdPPL8wJo3b9MgGxo3RB88jCVjsoS3eape16gKcXYrdFVp6tUEX7ZssF-zl0z1N-j8lFGaPthggVHXOA4IiXLWuiI8YwPspIW7CaH1Yi6totz7ahOHvkEXQQIk4JaewS6s21LTikqFVbnhsh5C1hXehac29y2RVgZ1SY4IGEcJ5iX8NlyuwZ4snwF2nkEApdIKi_0BIMs6MHGRKOlLisdvmLBlre-ii-d9O-UQjK8xofFKS0V58QQ2ITwdC4sZR6ZAahbLifB7TPywIvn4zJO7ItSUHATPUBLGN8SWK--iJzS3eZr04/p.png',
        message: 'No se encontró el usuario',
        message2: 'Por favor inicie sesión',
      };
      this.dialog.open(ModalComponent, { data: dialogData });
    }
  }
}
