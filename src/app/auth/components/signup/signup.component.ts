import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  isSpinning: boolean = false; // Declare isSpinning property

  signupForm: FormGroup; // Define signupForm property

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // Initialize signupForm in the constructor
    this.signupForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidate.bind(this)]],
      name: [null, [Validators.required]],
    });
  }

  confirmationValidate(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return null;
  }

  onSubmit() {

    this.isSpinning = true;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe(
        (res) => {
          console.log('Registration successful', res);
          // Stop the spinner
          this.isSpinning = false;
        },
        (error) => {
          console.error('Registration failed', error);
          // Stop the spinner
          this.isSpinning = false;
        }
      );
    } else {
      console.error('Form is invalid');
      this.isSpinning = false;
    }
  }
}
