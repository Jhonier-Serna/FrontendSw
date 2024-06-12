import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ModalComponent } from '../../../../public/modal/modal.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTaskSnapshot,
} from '@angular/fire/storage';

interface SelectedFile {
  file: File;
  preview: string;
  type: string;
  downloadURL?: string;
}

@Component({
  selector: 'app-edit-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  event = {
    id: 1,
    name: 'Andres Cepeda 1',
    categoria: 'Concierto',
    fecha: '2024-06-12',
    plazas: 500,
    HInicio: '17:00',
    HFin: '20:00',
    lugar: 'Plaza de toros',
    encargado: 'Alcaldía',
    descripcion:
      '¡Andrés Cepeda llega a Manizales con su gira "Nuestra Vida en Canciones"!Prepárate para una noche inolvidable llena de romanticismo y nostalgia con uno de los artistas más reconocidos de Colombia. Andrés Cepeda se presentará en la Plaza de Toros de Manizales el próximo 29 de noviembre de 2024 a las 8:30 p.m.En este concierto, Cepeda repasará sus más grandes éxitos, como "Lo Que Faltaba", "Mil Tángos", "A Favor de Ti", "La Ruta Púrpura" y "Yo Me Enamoré", entre muchas otras. Además, contará con la participación de invitados especiales.No te pierdas la oportunidad de vivir una experiencia única junto a Andrés Cepeda y sus canciones.',
    archivos: [
      'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/uploads%2Fcepeda1.jpg?alt=media&token=1f1e99d6-995d-4221-8b13-1208ac776ad2',
      'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/uploads%2Fcepeda2.jpg?alt=media&token=42a5d583-d1d2-40b0-a14b-84b1b932e5e4',
      'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/uploads%2Fcepeda.mp4?alt=media&token=1bfb7bbe-e929-433c-bd1b-b485c77c8777',
    ],
  };

  fGroup: FormGroup = new FormGroup({});
  selectedFiles: SelectedFile[] = [];
  uploadProgress$: Observable<number>[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.FormBuild();
    this.loadEventData();
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

  loadEventData() {
    this.fGroup.patchValue({
      eventName: this.event.name,
      category: this.event.categoria,
      date: this.event.fecha,
      places: this.event.plazas,
      startTime: this.event.HInicio,
      endTime: this.event.HFin,
      place: this.event.lugar,
      entityInCharge: this.event.encargado,
      description: this.event.descripcion,
    });
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const files: File[] = Array.from(event.target.files as FileList);
      files.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push({
            file,
            preview: e.target.result,
            type: file.type,
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  uploadFile(file: File): Observable<string> {
    const filePath = `uploads/${Date.now()}_${file.name}`;
    const fileRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(fileRef, file);

    return new Observable<string>((observer) => {
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          observer.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            observer.next(downloadURL);
            observer.complete();
          });
        }
      );
    });
  }

  deleteFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  uploadFiles(): Observable<string[]> {
    const uploadObservables = this.selectedFiles.map((selectedFile) =>
      this.uploadFile(selectedFile.file).pipe(catchError(() => of('')))
    );

    return forkJoin(uploadObservables).pipe(
      map((results) => results.filter((result) => !!result))
    );
  }

  async saveEvent() {
    if (this.fGroup.invalid) {
      this.showErrorDialog('Error al crear el evento!');
      return;
    }

    try {
      let formData;
      if (this.selectedFiles.length !== 0) {
        this.uploadFiles().subscribe({
          next: (downloadURLs) => {
            formData = {
              ...this.fGroup.value,
              fileLinks: downloadURLs.concat(this.event.archivos),
            };
            this.showSuccessDialog('¡Evento creado exitosamente!');
          },
        });
      } else {
        formData = {
          ...this.fGroup.value,
          fileLinks: this.event.archivos,
        };
        this.showSuccessDialog('¡Evento creado exitosamente!');
        console.log(formData);
        return;
      }
    } catch (error) {
      console.error('Error uploading files: ', error);
      this.showErrorDialog('Error al subir los archivos!');
    }
  }

  showErrorDialog(message: string) {
    const dialogData = {
      imageSrc:
        'https://ucb3975a9b09efbd37ce9fccaf1e.previews.dropboxusercontent.com/p/thumb/ACRJITIMMfFZypkn7tLz_uda0dmaMv_FbFMUXitkfLaaGQ4Ztf1TJ3Hs41VwpB26p5-8RqBzmw4xqTFQLdPPL8wJo3b9MgGxo3RB88jCVjsoS3eape16gKcXYrdFVp6tUEX7ZssF-zl0z1N-j8lFGaPthggVHXOA4IiXLWuiI8YwPspIW7CaH1Yi6totz7ahOHvkEXQQIk4JaewS6s21LTikqFVbnhsh5C1hXehac29y2RVgZ1SY4IGEcJ5iX8NlyuwZ4snwF2nkEApdIKi_0BIMs6MHGRKOlLisdvmLBlre-ii-d9O-UQjK8xofFKS0V58QQ2ITwdC4sZR6ZAahbLifB7TPywIvn4zJO7ItSUHATPUBLGN8SWK--iJzS3eZr04/p.png',
      message: message,
      message2: 'Reintentar',
    };
    this.dialog.open(ModalComponent, { data: dialogData });
  }

  showSuccessDialog(message: string) {
    const dialogData = {
      imageSrc:
        'https://uc923483daef064c1e5e5423d1b0.previews.dropboxusercontent.com/p/thumb/ACSfwGQCITIrb_8c73GPh0LhrcQsmye1odFHjs7144Mz0u9jByuZvm2BGPVulitxeZGwWdxoMwNppkvl1cLcmhloWc7IkMH7MnicSyxdh_DOerh2gaRiPslYw2LHkQcqpnmVzR33blTC1yGRVquahiIjatEdX0g871FmyI5-wMvqG760jH0Mp1D_SsDH4DPDQdA_L7BybKWmhQb8Gaw2lf-xLdLKDMv6RZ9z1nwgTSPdVmrji1E53vekQwqdps5-Tl8AVJG4yFE4cZ8EIVWTNTCJTtmMMTVgfVX4dBmngX9n38DhEvyHMGQQt3GzOYa3PM4hgAYF01-ybDU2_noamMwtmk-7IH4MBym1G6Rcd6dl9JZ93qvz97Gk9uzVLuj9TSc/p.png',
      message: message,
      message2: 'Gracias!',
    };
    this.dialog.open(ModalComponent, { data: dialogData });
  }

  get getformGroup() {
    return this.fGroup.controls;
  }
}
