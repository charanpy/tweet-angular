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
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavItemsComponent } from './components/nav-items/nav-items.component';
import { PagesnotfoundComponent } from './pages/pagesnotfound/pagesnotfound.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AuthComponent, SidenavComponent, NavItemsComponent, PagesnotfoundComponent, HeaderComponent, ProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
