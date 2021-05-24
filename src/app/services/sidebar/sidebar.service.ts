import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidenav: MatSidenav | null = null;
  constructor() {}

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public toggle() {
    if (this.sidenav) {
      return this.sidenav.toggle();
    }
    return;
  }
}
