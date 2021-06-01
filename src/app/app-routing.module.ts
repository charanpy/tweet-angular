import { TweetComponent } from './pages/tweet/tweet.component';
import { UserTweetsComponent } from './pages/user-tweets/user-tweets.component';
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
import { PagesnotfoundComponent } from './pages/pagesnotfound/pagesnotfound.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddTweetComponent } from './pages/add-tweet/add-tweet.component';
import { SearchTweetsComponent } from './pages/search-tweets/search-tweets.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInHome },
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'add-tweet',
    component: AddTweetComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'search',
    component: SearchTweetsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: ':hashtag',
        component: SearchTweetsComponent,
        canActivate: [AngularFireAuthGuard],
      },
    ],
  },
  {
    path: 'user-tweets',
    component: UserTweetsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'tweet/:id',
    component: TweetComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: '**',
    component: PagesnotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
