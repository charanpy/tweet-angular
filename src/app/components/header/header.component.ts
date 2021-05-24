import { SidebarService } from './../../services/sidebar/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string = '';
  constructor(private auth: AuthService, private sidebar: SidebarService) {
    this.auth.getUser().subscribe((user) => {
      if (user && user?.displayName) {
        this.username = user?.displayName;
      }
    });
  }

  ngOnInit(): void {}

  toggleSidebar() {
    this.sidebar.toggle();
  }
}
