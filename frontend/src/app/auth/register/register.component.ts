import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { fromApp } from 'src/app/shared/store';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/shared/store/auth';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;

  popupSub: Subscription;

  isFormSubmitted = false;
  subscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }


  onSubmit() {
    this.isFormSubmitted = true;

    if (this.registerForm.valid) {
      const user = new User();
      user.password = this.registerForm.value.password;
      user.first_name = this.registerForm.value.first_name;
      user.last_name = this.registerForm.value.last_name;
      user.email = this.registerForm.value.email;

      this.store.dispatch(AuthActions.registerStart(user));
    }
  }

  ngOnDestroy(): void {
  }
}
