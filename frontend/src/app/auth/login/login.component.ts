import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fromApp } from 'src/app/shared/store';
import { AuthActions } from 'src/app/shared/store/auth';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isFormSubmitted = false;
  isPasswordVisible: boolean = false;
  serverError$: Observable<string>;
  subscription: Subscription;

  constructor(
    private statusBar: StatusBar,
    private router: Router,
    private platform: Platform,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit() {
    this.initForm();
    this.serverError$ = this.store.select('auth').pipe(map(state => {
      if (!state.registerUser) return state.authError; else return null;
    }));

  }

  initForm() {
    this.loginForm = new FormGroup({
      mobile: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      password: new FormControl(null, Validators.required),
    });
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString('#f1faee');
  }

  redirectToRegister() {
    this.router.navigate(['auth', 'register'], { replaceUrl: true });
  }

  goToForgotPassword() {
    this.router.navigate(['auth', 'forgot-password'], { replaceUrl: true });
  }

  onViewPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      this.store.dispatch(AuthActions.loginStart({
        mobile: this.loginForm.value.mobile,
        password: this.loginForm.value.password,
      }));
    }
  }
}
