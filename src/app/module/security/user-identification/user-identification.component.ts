import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SecurityService } from '../../../services/security.service';
import { UserModel } from '../../../models/user.model';
import { jwtDecode } from 'jwt-decode';
import { ParametersService } from '../../../services/parameters.service';

@Component({
  selector: 'app-user-identification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './user-identification.component.html',
  styleUrl: './user-identification.component.css',
})
export class UserIdentificationComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private SecurityService: SecurityService,
    private ParametersService: ParametersService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.fGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  userIdentification() {
    if (this.fGroup.invalid) {
      alert('Datos incompletos');
    } else {
      const formData = { ...this.fGroup.value };
      this.SecurityService.login(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.handleSuccessfulLogin(data);
        },
        error: (err: any) => {
          console.error('Error uploading files: ', err);
        },
      });
    }
  }

  handleSuccessfulLogin(data: any) {
    try {
      const jwtToken = data.token;

      const decodedToken: any = jwtDecode(jwtToken);
      const email = decodedToken.email;

      this.ParametersService.findUser(email).subscribe({
        next: (data) => {
          localStorage.setItem('userData', JSON.stringify(data));
        },
        error: (err: any) => {
          console.error('Error uploading files: ', err);
        },
      });

      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error decoding token: ', error);
    }
  }

  get getformGroup() {
    return this.fGroup.controls;
  }
}
