import { Subscription, of, Observable } from 'rxjs';
import { UserModel } from '.././../models/user.model';
import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  id: string = '';
  subscription: Subscription = new Subscription();
  user: Observable<any>;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.user = this.auth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore
            .collection('users')
            .doc(user.uid)
            .valueChanges();
        }
        return of(null);
      })
    );
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  getUserById(id: string) {
    return this.firestore.collection('users').doc(id).get().toPromise();
  }
  getUser() {
    return this.auth.authState;
  }

  setUser(uid: string) {
    return this.firestore.collection('users').doc(uid).get();
  }

  onGoogleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.auth.signInWithPopup(provider);
  }

  signOut() {
    return this.auth.signOut();
  }

  // create user document
  async createUser(user: UserModel, id: string) {
    return this.firestore.doc(`users/${id}`).set(user);
  }

  // check id exist
  validateUserId(user: UserModel): UserModel {
    if (!user.id) {
      const id = this.firestore.createId();
      const userDetails = {
        ...user,
        id,
      };
      return userDetails;
    } else {
      return user;
    }
  }

  updateProfile(): string | undefined {
    const name: string | null = localStorage.getItem('blog-angular');
    if (name) {
      this.subscription.add(
        this.auth.authState.subscribe((res) => {
          res
            ?.updateProfile({ displayName: name })
            .then(() => localStorage.removeItem('blog-angular'));
        })
      );
      return name;
    }
    return;
  }

  googleSignIn() {
    try {
      return this.onGoogleSignIn().then(({ user }) => {
        this.subscription.add(
          this.firestore
            .doc(`users/${user && user.uid}`)
            .get()
            .subscribe((res) => {
              if (!res?.exists) {
                console.log('not exist');

                if (user && user?.email && user?.displayName && user?.uid) {
                  const { email, displayName, uid, photoURL } = user;
                  const userData: UserModel = {
                    email: email,
                    id: uid,
                    username: displayName,
                    bio: 'BlogDev User',
                    photo: photoURL || null,
                  };
                  const userDetail: UserModel = this.validateUserId(userData);
                  if (userDetail?.id) {
                    return this.createUser(userDetail, userDetail.id);
                  }
                  throw new Error('id not exists');
                }
                throw new Error("can't retrieve data");
              }
              console.log('exist');

              return;
            })
        );

        return {
          success: true,
          error: '',
        };
      });
    } catch (error) {
      throw new Error();
    }
  }

  subscribeToUser() {
    return this.firestore.doc(`users/${this.id}`).valueChanges();
  }

  updateProfileDetails(
    userData: {
      username?: string;
      bio?: string;
      photo?: string;
    },
    id: string
  ) {
    return this.firestore.doc(`users/${id}`).update(userData);
  }

  getTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getdbTimestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
