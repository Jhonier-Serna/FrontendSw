import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ModalComponent } from '../../../../public/modal/modal.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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

interface SelectedFile {
  file: File;
  preview: string;
  type: string;
  downloadURL?: string;
}

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  selectedFiles: SelectedFile[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private storage: Storage,
    private parametersService: ParametersService
  ) {}
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

  async saveEvent() {
    if (this.fGroup.invalid) {
      console.log(this.fGroup);
      const dialogData = {
        imageSrc: '...',
        message: 'Error al crear el evento!',
        message2: 'Reintentar',
      };
      this.dialog.open(ModalComponent, { data: dialogData });
      return;
    }

    try {
      const downloadURLs = await this.uploadFiles().toPromise();
      const formData = { ...this.fGroup.value, fileLinks: downloadURLs };
      this.parametersService.saveEvent(formData).subscribe({
        next: (data: EventModel) => {
          const dialogData = {
            imageSrc: '...',
            message: '¡Evento creado exitosamente!',
            message2: 'Gracias!',
          };
          this.dialog.open(ModalComponent, { data: dialogData });
        },
        error: (err: any) => {
          console.error('Error uploading files: ');
          const dialogData = {
            imageSrc: '...',
            message: 'Error al subir los archivos!',
            message2: 'Reintentar',
          };
          this.dialog.open(ModalComponent, { data: dialogData });
        },
      });
    } catch (error) {
      console.error('Error uploading files: ', error);
      const dialogData = {
        imageSrc: '...',
        message: 'Error al subir los archivos!',
        message2: 'Reintentar',
      };
      this.dialog.open(ModalComponent, { data: dialogData });
    }
  }

  get getformGroup() {
    return this.fGroup.controls;
  }

  private uploadFiles(): Observable<string[]> {
    const uploadObservables = this.selectedFiles.map((selectedFile) =>
      this.uploadFile(selectedFile.file).pipe(catchError(() => of('')))
    );

    return forkJoin(uploadObservables).pipe(
      map((results) => results.filter((result) => !!result))
    );
  }
}
