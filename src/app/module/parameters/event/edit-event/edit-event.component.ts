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
//oe 
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
