import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-events-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './events-table.component.html',
  styleUrl: './events-table.component.css',
})
export class EventsTableComponent {
  eventList = [
    {
      id: 1,
      name: 'Andres cepeda 1',
      categoria: 'Concierto',
      fecha: '12-06-2024',
      plazas: 500,
      HInicio: '5:00',
      HFin: '8:00',
      lugar: 'Plaza de toros',
      encargado: 'Alcaldía',
      descripcion:
        '¡Andrés Cepeda llega a Manizales con su gira "Nuestra Vida en Canciones"!Prepárate para una noche inolvidable llena de romanticismo y nostalgia con uno de los artistas más reconocidos de Colombia. Andrés Cepeda se presentará en la Plaza de Toros de Manizales el próximo 29 de noviembre de 2024 a las 8:30 p.m.En este concierto, Cepeda repasará sus más grandes éxitos, como "Lo Que Faltaba", "Mil Tángos", "A Favor de Ti", "La Ruta Púrpura" y "Yo Me Enamoré", entre muchas otras. Además, contará con la participación de invitados especiales.No te pierdas la oportunidad de vivir una experiencia única junto a Andrés Cepeda y sus canciones.',
      archivos: [
        'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/uploads%2Fcepeda1.jpg?alt=media&token=1f1e99d6-995d-4221-8b13-1208ac776ad2',
        'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/uploads%2Fcepeda2.jpg?alt=media&token=42a5d583-d1d2-40b0-a14b-84b1b932e5e4',
        'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/uploads%2Fcepeda.mp4?alt=media&token=1bfb7bbe-e929-433c-bd1b-b485c77c8777',
      ],
    },
  ];
}
