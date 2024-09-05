import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  u: User = {};

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private user: UserService, private r: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$'),
      ],
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email,
          this.domainLengthValidator(),
          // this.dotComValidator(),
          this.emailValidators()
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$'
          ),
        ],
      ],
    });
  }

  emailValidators(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (email) {
        const [localPart, domainPart] = email.split('@');

        // Check if local part has at least 5 characters
        if (localPart.length < 5) {
          return { localPartLength: true };
        }

        // Check if domain part has at least 4 characters
        if (domainPart && domainPart.length < 4) {
          return { domainLength: true };
        }

        // Check if domain ends with '.com'
        if (domainPart && !domainPart.endsWith('.com')) {
          return { dotCom: true };
        }
      }
      return null;
    };
  }

  domainLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (email) {
        const domainPart = email.split('@')[1];
        // Extract only alphabetic characters from the domain part
        const alphabeticDomainPart = domainPart?.replace(/[^a-zA-Z]/g, ''); // Remove non-alphabetic characters
        if (alphabeticDomainPart && alphabeticDomainPart.length < 4) {
          return { domainLength: true };
        }
      }
      return null;
    };
  }

  // dotComValidator(): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const email = control.value;
  //     if (email && !email.endsWith('.com')) {
  //       return { dotCom: true };
  //     }
  //     return null;
  //   };
  // }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted', this.signupForm.value);
      const username = this.signupForm.get('username')?.value;
      const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;
      console.log(username);
      console.log(email);
      console.log(password);
      this.u.email = email;
      this.u.password = password;
      this.u.username = username;
      const timestamp = new Date().getTime();
      const randomNumber = Math.floor(Math.random() * 10000);
      const uniqueId = timestamp + randomNumber;
      const stringValue: string = uniqueId.toString();
      this.u.userId = stringValue;
      this.user.registerUser(this.u).subscribe(
        (response: any) => {
          console.log(response);

          // Display the user ID in the snack bar
          this.snackBar.open(
            "SingUp Successfully",
            " ",
            {
              duration: 5000, // Duration in milliseconds
              verticalPosition: 'bottom' // Optional: Change the position of the snackbar
            }
          );

          // Navigate to home
          this.r.navigateByUrl("home");
        }
        ,
        (err) => {
          this.snackBar.open("Username or Email Address Already Exists", " ", {
            duration: 3000
          });
          console.log(err.message);
        })

    }
  }
}
