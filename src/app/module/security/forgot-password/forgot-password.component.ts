import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  fGroup: any;

  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit() {
    this.buildForm();
    //this.router.navigate('/security/user-identification')
  }


  buildForm() {
    this.fGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

  }

  get getformGroup() {
    return this.fGroup.controls;
  }

}
