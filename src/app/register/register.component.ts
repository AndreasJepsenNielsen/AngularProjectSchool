import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit  {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        type: ['', Validators.required],
        birthdate: ['', Validators.required]
      }
    )
  }
  
  onSubmit() {
    console.log(this.registerForm);

    /*
    if (this.registerForm.valid) {
      // Send the data to the server to verfy the user login

    }
    else
    {
      //
      
      
    }
    */
  }
}