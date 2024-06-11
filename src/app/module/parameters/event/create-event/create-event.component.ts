import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../../public/modal/modal.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

interface SelectedFile {
  file: File;
  preview: string;
  type: string;
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

  constructor(private fb: FormBuilder, private dialog: MatDialog) {}

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

  saveEvent() {
    if (this.fGroup.invalid) {
      const dialogData = {
        imageSrc:
          'https://previews.dropbox.com/p/thumb/ACTBrDQQPxSBFvfNeSzeiRWh03o87-EmptEX9exoMrMW4Qbz-dCnC9R80DOp-IqmjbbKRwsNKNsTDar-wKrW0-cS25Akoe7FydN1b6n1Cn5HK9U0WyqP4eX0MKI9tWckTNMfLlpk8-1lS8NJgIJEgFx9pgX0BECK1CS-LTgKZsDdta3nyZwMEvhtV_r9qd9nBJajw9aJ1MTwqG8kZ8vaOc9BKFHaHu6RC9c5CXWkXexlqH5PHNstkUQe0kP7QSX5Iucc-XgycA49avU7vzqAtpxJLIZAGofLDUSuqboytVlOhUBskxfYjhbN7FeCSlOFrM1KHb9rdpLXTctVdsrhsq5b/p.png',
        message: 'Error al crear el evento!',
        message2: 'Reintentar',
      };
      this.dialog.open(ModalComponent, {
        data: dialogData,
      });
    } else {
      const dialogData = {
        imageSrc:
          'https://uc923483daef064c1e5e5423d1b0.previews.dropboxusercontent.com/p/thumb/ACSa1kTByuPUsNWKJY0yc_9NxFIpwaaqQEsdurGsVhwW_D5dg66j1UciegR9NcdqA5SXZfiGT4G__p5zI1Yzv3c9ytvvSCJMTI-ydTmdQjbPMmXluHzmqQ9WFHOOvo7ycky-H68X9tyoVKb3cRBo7rQq1VCsLixiTIFLhJn_OW-Ubs3j3bbto8HLJ3qnY_mDCAyn2eywaRlZBC8Q1mGPDWPqhqb84iT1yUnV_QMIgVWCLNvLwOeuOfZSKx9ETbjuY5zkM5aI1CVe_RWT5fN1bhzf6i837Ho3jTN2fZPvdKB-JZbOiqx13a1TQr7GIkO2OviXTSJwgZyIl9qjmEHxKK2BicthhUQnhuCMh-7Adf7qFTyxL_i6KJNWfQGlOUl4Wj4_pG16lphPZ3h1YhXvU7SbI8OhBfEM9GvAB7TisV_xkavUx-gfKnB9OhLSW36cO6Q/p.png',
        message: '¡Evento creado exitosamente!',
        message2: '',
      };
      this.dialog.open(ModalComponent, {
        data: dialogData,
      });
    }
  }

  get getformGroup() {
    return this.fGroup.controls;
  }
}
