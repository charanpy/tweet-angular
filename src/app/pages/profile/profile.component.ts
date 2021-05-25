import { UploadImageService } from './../../services/upload-image/upload-image.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ToastrService } from 'src/app/services/toatr/toastr.service';
import { UserModel } from './../../models/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: UserModel | null = null;
  editAction: boolean = false;
  subscribe: Subscription | null = null;
  @ViewChild('username') username: ElementRef | null = null;
  @ViewChild('bio') bio: ElementRef | null = null;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private storage: UploadImageService
  ) {}

  ngOnInit(): void {
    this.subscribe = this.auth.subscribeToUser().subscribe((user) => {
      this.user = user as UserModel;
      this.auth.setUserInfo(user as UserModel);
    });
    this.user = this.auth.user;
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }

  onEditProfile(): void {
    if (!this.editAction) {
      this.editAction = true;
      return;
    }

    if (this.username && this.bio) {
      const username = this.username.nativeElement.value;
      const bio = this.bio.nativeElement.value;
      if (username.length < 2) {
        this.toastr.openSnackBar(
          'Username should be atleast 2 characters',
          'error'
        );
        return;
      }
      if (username === this.user?.username && bio === this.user?.bio) {
        this.toastr.openSnackBar('Profile updated', 'success');
        return;
      }
      this.auth
        .updateProfileDetails({
          username,
          bio: bio || 'Tweetdev user',
        })
        .then(() => this.toastr.openSnackBar('Profile updated', 'success'));
    }
  }

  upload(e: Event) {
    const file = (<HTMLInputElement>e.target).files;
    if (file?.length) {
      const image = file[0];
      console.log(this.storage.uploadImage(image));
    }
  }
}
