import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-identification',
  standalone: true,
  imports: [

    ReactiveFormsModule,
    CommonModule

  ],
  templateUrl: './user-identification.component.html',
  styleUrl: './user-identification.component.css'
})
export class UserIdentificationComponent {
fGroup: FormGroup = new FormGroup({});

constructor(
  private fb: FormBuilder,

){

}
ngOnInit(){
  this.buildForm();
}

buildForm(){
  this.fGroup= this.fb.group({

    user : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required ]]

  });

}

userIdentification(){
  if (this.fGroup.invalid){
    alert("Datos incompletos")
  }else{
    alert('identificando....')
  }

}

get getformGroup(){
  return this.fGroup.controls;
}

}
