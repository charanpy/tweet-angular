import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// firebase
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

// pages
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
