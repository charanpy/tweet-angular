import { UserModel } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from './../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthInput } from '../../models/auth-input.model';
import { loginControlData, registerControlData } from './auth.utils';
import { ToastrService } from './../../services/toatr/toastr.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  loginControls: AuthInput[] = loginControlData;
  registerControls: AuthInput[] = registerControlData;
  currentOperation: string = 'LOGIN';

  private _loginForm: FormGroup = new FormGroup({});
  private _registerForm: FormGroup = new FormGroup({});

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  get registerForm(): FormGroup {
    return this._registerForm;
  }

  set loginForm(value: FormGroup) {
    this._loginForm = value;
  }

  set registerForm(value: FormGroup) {
    this._registerForm = value;
  }

  buildCommonValidators(action: string) {
    return {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(action === 'login' ? 6 : 1)],
      ],
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      ...this.buildCommonValidators('login'),
    });
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      ...this.buildCommonValidators('register'),
      bio: ['Tweetdev user'],
    });
  }

  ngOnInit(): void {
    console.log(22);
  }

  OnTabChange(tab: MatTabChangeEvent): void {
    if (tab.index) {
      this.loginForm.reset();
      this.currentOperation = 'REGISTER';
      return;
    }
    this.registerForm.reset();
    this.currentOperation = 'LOGIN';
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.toastr.openSnackBar('Please fill all fields', 'error');
      return;
    }
    const { email, password } = this.loginForm.value;
    this.auth
      .signIn(email, password)
      .then(() => this.redirectToHome())
      .catch((e) => {
        this.toastr.openSnackBar(e.message, 'error');
      });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.toastr.openSnackBar('Please fill out form fields', 'error');
      return;
    }
    const { email, password, bio, username } = this.registerForm.value;
    const userData: UserModel = {
      email,
      bio,
      username,
    };
    localStorage.setItem('blog-angular', username);
    this.auth
      .signUp(email, password)
      .then(() => {
        const user: UserModel = this.auth.validateUserId(userData);
        if (user?.id)
          this.auth
            .createUser(user, user.id)
            .then(() => {
              this.toastr.openSnackBar('Logged in successfully', 'success');
              this.redirectToHome();
            })
            .catch((e) => {
              this.toastr.openSnackBar(e.message, 'error');
            });
      })
      .catch((e) => this.toastr.openSnackBar(e.message, 'error'));
  }
  redirectToHome() {
    this.router.navigateByUrl('/');
  }
  async onGoogleSignIn() {
    try {
      await this.auth.googleSignIn();
      this.redirectToHome();
    } catch (error) {
      this.toastr.openSnackBar('OOPS!.Please try again', 'error');
    }
  }
}
