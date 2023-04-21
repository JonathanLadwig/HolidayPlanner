import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(public auth: AuthService, private fb: UntypedFormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      displayName: [null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{10,}')]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.auth.register(this.validateForm.value.email, this.validateForm.value.password, this.validateForm.value.displayName);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  goBack() {
    this.router.navigate(['login']);
  }
}
