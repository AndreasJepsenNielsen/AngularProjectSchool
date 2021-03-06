import { QuizActions } from './../quiz.actions';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router, private authService: AuthService, private quizActions: QuizActions) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]], 
        password: ['', Validators.required] 
      }
    )
  }

  onSubmit() : void {
    this.snackBar.open('One second, logging in..', 'Close', {
      duration: 2000,
    });

    if (this.loginForm.valid) {
      this.quizActions.setLoggedIn(true);
    
      console.log("First");

      this.authService.login().subscribe(result => {
        console.log("Third");

        this.router.navigate(['portal/index']);  
      });
      console.log("Second");
      
    }
    else {
      console.log("Loginform not valid")
    }

  }


}
