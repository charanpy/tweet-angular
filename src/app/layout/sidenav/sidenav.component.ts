import { MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from './../../services/sidebar/sidebar.service';
import { NavigationStart, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'src/app/services/toatr/toastr.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnDestroy {
  @ViewChild('snav', { static: true }) sidenav: MatSidenav | null = null;
  mobileQuery: MediaQueryList;
  active: string = '';
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    private toastr: ToastrService,
    private auth: AuthService,
    private sidebar: SidebarService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    if (this.sidenav) {
      this.sidebar.setSidenav(this.sidenav);
    }
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.active = e.url;
      }
    });
  }

  close() {
    this.sidenav?.close();
  }
  async onNavClick(e: string | undefined) {
    if (this.mobileQuery.matches) {
      this.sidenav?.close();
    }
    if (e === '/') {
      this.router.navigate(['']);
      return;
    }
    if (e) {
      this.router.navigateByUrl(`/${e}`);
      return;
    }

    try {
      await this.auth.signOut();
      this.toastr.openSnackBar('Logged out successfully!', 'success');
      this.router.navigateByUrl('/auth');
    } catch (e) {
      console.log(e);
    }
  }
}
