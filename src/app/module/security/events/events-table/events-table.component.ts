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
            'https://uc923483daef064c1e5e5423d1b0.previews.dropboxusercontent.com/p/thumb/ACSfwGQCITIrb_8c73GPh0LhrcQsmye1odFHjs7144Mz0u9jByuZvm2BGPVulitxeZGwWdxoMwNppkvl1cLcmhloWc7IkMH7MnicSyxdh_DOerh2gaRiPslYw2LHkQcqpnmVzR33blTC1yGRVquahiIjatEdX0g871FmyI5-wMvqG760jH0Mp1D_SsDH4DPDQdA_L7BybKWmhQb8Gaw2lf-xLdLKDMv6RZ9z1nwgTSPdVmrji1E53vekQwqdps5-Tl8AVJG4yFE4cZ8EIVWTNTCJTtmMMTVgfVX4dBmngX9n38DhEvyHMGQQt3GzOYa3PM4hgAYF01-ybDU2_noamMwtmk-7IH4MBym1G6Rcd6dl9JZ93qvz97Gk9uzVLuj9TSc/p.png',
          message: 'Evento eliminado con éxito',
          message2: 'Gracias!',
        };
        this.dialog.open(ModalComponent, { data: dialogData });
      },
      error: (err) => {
        const dialogData = {
          imageSrc:
            'https://ucb3975a9b09efbd37ce9fccaf1e.previews.dropboxusercontent.com/p/thumb/ACRJITIMMfFZypkn7tLz_uda0dmaMv_FbFMUXitkfLaaGQ4Ztf1TJ3Hs41VwpB26p5-8RqBzmw4xqTFQLdPPL8wJo3b9MgGxo3RB88jCVjsoS3eape16gKcXYrdFVp6tUEX7ZssF-zl0z1N-j8lFGaPthggVHXOA4IiXLWuiI8YwPspIW7CaH1Yi6totz7ahOHvkEXQQIk4JaewS6s21LTikqFVbnhsh5C1hXehac29y2RVgZ1SY4IGEcJ5iX8NlyuwZ4snwF2nkEApdIKi_0BIMs6MHGRKOlLisdvmLBlre-ii-d9O-UQjK8xofFKS0V58QQ2ITwdC4sZR6ZAahbLifB7TPywIvn4zJO7ItSUHATPUBLGN8SWK--iJzS3eZr04/p.png',
          message: 'No se pudo eliminar el evento',
          message2: 'Reintentar',
        };
        this.dialog.open(ModalComponent, { data: dialogData });
      },
    });
  }
}
