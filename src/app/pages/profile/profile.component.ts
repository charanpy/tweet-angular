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
import { UploadImageService } from './../../services/upload-image/upload-image.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: UserModel | null = null;
  editAction: boolean = false;

  profileSubscription: Subscription = new Subscription();

  @ViewChild('username') username: ElementRef | null = null;
  @ViewChild('bio') bio: ElementRef | null = null;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private storage: UploadImageService
  ) {}

  ngOnInit(): void {
    console.log('triggered');
    this.profileSubscription = this.auth.subscribeToUser().subscribe((user) => {
      this.user = user as UserModel;
      console.log(user, 333);
      this.auth.setUserInfo(user as UserModel);
    });
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

  upload(file: File) {
    this.storage
      .uploadImage(file, 'profile', this.user?.photo || null)
      .then((photo) => this.auth.updateProfileDetails({ photo }));
  }
  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }
}
