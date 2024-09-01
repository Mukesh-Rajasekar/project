import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  u:User = {};

  constructor(private fb: FormBuilder, private user:UserService, private r: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      const username = this.signupForm.get('username')?.value;
      const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;
      console.log(username);
      console.log(email);
      console.log(password);
      this.u.email=email;
      this.u.password=password;
      this.u.username=username;
      const timestamp = new Date().getTime(); 
  const randomNumber = Math.floor(Math.random() * 10000);
  const uniqueId = timestamp+randomNumber;
  const stringValue: string = uniqueId.toString();
      this.u.userId=stringValue;
      this.user.registerUser(this.u).subscribe(
        (response: any) => {
        console.log(response);
         alert("SignUp successful");
        this.r.navigateByUrl("home");
      },
      (err) => {
        alert("invalid credentials")
        console.log(err.message);
      })

    }
  }
}
