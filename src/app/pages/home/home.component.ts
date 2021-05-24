import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  async onSignOut() {
    try {
      await this.auth.signOut();
    } catch (error) {}
  }
}
