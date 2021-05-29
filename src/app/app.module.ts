import { UploadImageService } from './services/upload-image/upload-image.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TweetService } from 'src/app/services/tweet/tweet.service';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { AuthComponent } from './pages/auth/auth.component';

// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

// Material
import { MaterialModule } from './material/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavItemsComponent } from './layout/nav-items/nav-items.component';
import { PagesnotfoundComponent } from './pages/pagesnotfound/pagesnotfound.component';
import { HeaderComponent } from './layout/header/header.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { AddTweetComponent } from './pages/add-tweet/add-tweet.component';
import { ButtonComponent } from './components/button/button.component';
import { SearchTweetsComponent } from './pages/search-tweets/search-tweets.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { SelectImageComponent } from './components/add-tweet/select-image/select-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    NavItemsComponent,
    PagesnotfoundComponent,
    HeaderComponent,
    ProfileComponent,
    SidenavComponent,
    AddTweetComponent,
    ButtonComponent,
    SearchTweetsComponent,
    DialogBoxComponent,
    SelectImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [TweetService, AuthService, UploadImageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
