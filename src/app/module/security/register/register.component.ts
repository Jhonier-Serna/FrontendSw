import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ModalComponent } from '../../../public/modal/modal.component';
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
import { Router } from '@angular/router';

interface SelectedFile {
  file: File;
  preview: string;
  type: string;
  downloadURL?: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  selectedFile: SelectedFile | null = null;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private storage: Storage,
    private router: Router
  ) {}

  ngOnInit() {
    this.FormBuild();
  }

  FormBuild() {
    this.fGroup = this.fb.group({
      name: ['', [Validators.required]],
      surName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFile = {
          file,
          preview: e.target.result,
          type: file.type,
        };
      };
      reader.readAsDataURL(file);
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

  deleteFile() {
    this.selectedFile = null;
  }

  async saveEvent() {
    if (this.fGroup.invalid) {
      const dialogData = {
        imageSrc:
          'https://previews.dropbox.com/p/thumb/ACTBrDQQPxSBFvfNeSzeiRWh03o87-EmptEX9exoMrMW4Qbz-dCnC9R80DOp-IqmjbbKRwsNKNsTDar-wKrW0-cS25Akoe7FydN1b6n1Cn5HK9U0WyqP4eX0MKI9tWckTNMfLlpk8-1lS8NJgIJEgFx9pgX0BECK1CS-LTgKZsDdta3nyZwMEvhtV_r9qd9nBJajw9aJ1MTwqG8kZ8vaOc9BKFHaHu6RC9c5CXWkXexlqH5PHNstkUQe0kP7QSX5Iucc-XgycA49avU7vzqAtpxJLIZAGofLDUSuqboytVlOhUBskxfYjhbN7FeCSlOFrM1KHb9rdpLXTctVdsrhsq5b/p.png',
        message: 'Error al crear el evento!',
        message2: 'Reintentar',
      };
      this.dialog.open(ModalComponent, { data: dialogData });
      return;
    }

    if (!this.selectedFile) {
      const dialogData = {
        imageSrc:
          'https://previews.dropbox.com/p/thumb/ACTBrDQQPxSBFvfNeSzeiRWh03o87-EmptEX9exoMrMW4Qbz-dCnC9R80DOp-IqmjbbKRwsNKNsTDar-wKrW0-cS25Akoe7FydN1b6n1Cn5HK9U0WyqP4eX0MKI9tWckTNMfLlpk8-1lS8NJgIJEgFx9pgX0BECK1CS-LTgKZsDdta3nyZwMEvhtV_r9qd9nBJajw9aJ1MTwqG8kZ8vaOc9BKFHaHu6RC9c5CXWkXexlqH5PHNstkUQe0kP7QSX5Iucc-XgycA49avU7vzqAtpxJLIZAGofLDUSuqboytVlOhUBskxfYjhbN7FeCSlOFrM1KHb9rdpLXTctVdsrhsq5b/p.png',
        message: 'Debes seleccionar una imagen!',
        message2: 'Reintentar',
      };
      this.dialog.open(ModalComponent, { data: dialogData });
      return;
    }

    try {
      this.uploadFile(this.selectedFile.file).subscribe({
        next: (downloadURL) => {
          const formData = { ...this.fGroup.value, imageLink: downloadURL };
          console.log(formData);
          const dialogData = {
            imageSrc:
              'https://uc923483daef064c1e5e5423d1b0.previews.dropboxusercontent.com/p/thumb/ACSa1kTByuPUsNWKJY0yc_9NxFIpwaaqQEsdurGsVhwW_D5dg66j1UciegR9NcdqA5SXZfiGT4G__p5zI1Yzv3c9ytvvSCJMTI-ydTmdQjbPMmXluHzmqQ9WFHOOvo7ycky-H68X9tyoVKb3cRBo7rQq1VCsLixiTIFLhJn_OW-Ubs3j3bbto8HLJ3qnY_mDCAyn2eywaRlZBC8Q1mGPDWPqhqb84iT1yUnV_QMIgVWCLNvLwOeuOfZSKx9ETbjuY5zkM5aI1CVe_RWT5fN1bhzf6i837Ho3jTN2fZPvdKB-JZbOiqx13a1TQr7GIkO2OviXTSJwgZyIl9qjmEHxKK2BicthhUQnhuCMh-7Adf7qFTyxL_i6KJNWfQGlOUl4Wj4_pG16lphPZ3h1YhXvU7SbI8OhBfEM9GvAB7TisV_xkavUx-gfKnB9OhLSW36cO6Q/p.png',
            message: '¡Registro exitoso!',
            message2: 'Gracias!',
          };
          this.dialog.open(ModalComponent, { data: dialogData });
          return;
        },
        error: (error) => {
          console.error('Error uploading file: ', error);
          const dialogData = {
            imageSrc:
              'https://previews.dropbox.com/p/thumb/ACTBrDQQPxSBFvfNeSzeiRWh03o87-EmptEX9exoMrMW4Qbz-dCnC9R80DOp-IqmjbbKRwsNKNsTDar-wKrW0-cS25Akoe7FydN1b6n1Cn5HK9U0WyqP4eX0MKI9tWckTNMfLlpk8-1lS8NJgIJEgFx9pgX0BECK1CS-LTgKZsDdta3nyZwMEvhtV_r9qd9nBJajw9aJ1MTwqG8kZ8vaOc9BKFHaHu6RC9c5CXWkXexlqH5PHNstkUQe0kP7QSX5Iucc-XgycA49avU7vzqAtpxJLIZAGofLDUSuqboytVlOhUBskxfYjhbN7FeCSlOFrM1KHb9rdpLXTctVdsrhsq5b/p.png',
            message: 'Error al subir la imagen!',
            message2: 'Reintentar',
          };
          this.dialog.open(ModalComponent, { data: dialogData });
        },
      });
    } catch (error) {
      console.error('Error uploading file: ', error);
      const dialogData = {
        imageSrc:
          'https://previews.dropbox.com/p/thumb/ACTBrDQQPxSBFvfNeSzeiRWh03o87-EmptEX9exoMrMW4Qbz-dCnC9R80DOp-IqmjbbKRwsNKNsTDar-wKrW0-cS25Akoe7FydN1b6n1Cn5HK9U0WyqP4eX0MKI9tWckTNMfLlpk8-1lS8NJgIJEgFx9pgX0BECK1CS-LTgKZsDdta3nyZwMEvhtV_r9qd9nBJajw9aJ1MTwqG8kZ8vaOc9BKFHaHu6RC9c5CXWkXexlqH5PHNstkUQe0kP7QSX5Iucc-XgycA49avU7vzqAtpxJLIZAGofLDUSuqboytVlOhUBskxfYjhbN7FeCSlOFrM1KHb9rdpLXTctVdsrhsq5b/p.png',
        message: 'Error al subir la imagen!',
        message2: 'Reintentar',
      };
      this.dialog.open(ModalComponent, { data: dialogData });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  get getformGroup() {
    return this.fGroup.controls;
  }
}
