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
import { EventModel } from '../../../../models/event.model';
import { ParametersService } from '../../../../services/parameters.service';
import { ActivatedRoute } from '@angular/router';

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
  fGroup: FormGroup = new FormGroup({});
  selectedFiles: SelectedFile[] = [];
  uploadProgress$: Observable<number>[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private storage: Storage,
    private parametersService: ParametersService,
    private route: ActivatedRoute
  ) {}
  event: EventModel = new EventModel();
  eventId: string = '';

  ngOnInit() {
    const idFromRoute = this.route.snapshot.paramMap.get('id');
    this.eventId = idFromRoute !== null ? idFromRoute : '';
    this.FormBuild();
    this.loadEventData();
    this.parametersService.eventbyId(this.eventId).subscribe({
      next: (data) => {
        this.event = data;
        this.loadEventData();
      },
      error: (err) => {
        console.error('Error fetching event:', err);
      },
    });
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
    if (this.event) {
      this.fGroup.patchValue({
        eventName: this.event.eventName || '',
        category: this.event.category || '',
        date: this.event.date || '',
        places: this.event.places || '',
        startTime: this.event.startTime || '',
        endTime: this.event.endTime || '',
        place: this.event.place || '',
        entityInCharge: this.event.entityInCharge || '',
        description: this.event.description || '',
      });
    }
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
              fileLinks: downloadURLs.concat(this.event.fileLinks),
            };
          },
        });
      } else {
        formData = {
          ...this.fGroup.value,
          fileLinks: this.event.fileLinks,
        };
      }
      this.parametersService.updateEvent(this.eventId, formData).subscribe({
        next: (data: EventModel) => {
          this.showSuccessDialog('¡Evento creado exitosamente!');
        },
        error: (err: any) => {
          console.error('Error uploading files: ');
          this.showErrorDialog('Error al subir los archivos!');
        },
      });
    } catch (error) {
      console.error('Error uploading files: ', error);
      this.showErrorDialog('Error al subir los archivos!');
    }
  }

  showErrorDialog(message: string) {
    const dialogData = {
      imageSrc:
        'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/assets%2FboMCMJTh.png?alt=media&token=e8d41b61-9979-4cab-8c19-3c7cb489b72a',
      message: message,
      message2: 'Reintentar',
    };
    this.dialog.open(ModalComponent, { data: dialogData });
  }

  showSuccessDialog(message: string) {
    const dialogData = {
      imageSrc:
        'https://firebasestorage.googleapis.com/v0/b/manizalesinteligente.appspot.com/o/assets%2Fr9BK4XzQ.png?alt=media&token=7f73b923-1f9f-46c2-8041-60dc35c2a5b2',
      message: message,
      message2: 'Gracias!',
    };
    this.dialog.open(ModalComponent, { data: dialogData });
  }

  get getformGroup() {
    return this.fGroup.controls;
  }
}
