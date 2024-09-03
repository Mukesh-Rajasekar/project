import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from 'src/model/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  user: User = {};

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private loginS: LoginService, private r: Router) {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      const userId = this.loginForm.get('userId')?.value;
      const password = this.loginForm.get('password')?.value;
      this.user.userId = userId;
      this.user.password = password;

      console.log("working");
      this.loginS.generateToken(this.user).subscribe(
        (response: any) => {
          console.log(response);
          console.log("token " + response.token);

          // Assuming the username is returned in the response
          const username = response.username || this.user.userId; // Adjust as needed

          this.loginS.loginUser(response.token, username); // Pass token and username
          console.log("Token in LoginComponent: " + this.loginS.getToken());

          this.snackBar.open("Login Successful", "Success!", {
            duration: 3000
          });
          this.r.navigateByUrl("home");
        },
        (err) => {
          this.snackBar.open("Invalid Credentials", "Try Again", {
            duration: 3000
          });
          console.log(err.message);
        }
      );
    }
  }
}
