import { UserModel } from '.././../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  getUser() {
    return this.auth.authState;
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
      this.auth.authState.subscribe((res) => {
        res
          ?.updateProfile({ displayName: name })
          .then(() => localStorage.removeItem('blog-angular'));
      });
      return name;
    }
    return;
  }

  googleSignIn() {
    try {
      return this.onGoogleSignIn().then(({ user }) => {
        this.firestore
          .doc(`user/${user && user.uid}`)
          .get()
          .subscribe((res) => {
            if (!res?.exists) {
              if (user && user?.email && user?.displayName && user?.uid) {
                const { email, displayName, uid } = user;
                const userData: UserModel = {
                  email: email,
                  id: uid,
                  username: displayName,
                  bio: 'BlogDev User',
                };
                const userDetail: UserModel = this.validateUserId(userData);
                if (userDetail?.id) {
                  return this.createUser(userDetail, userDetail.id);
                }
                throw new Error('id not exists');
              }
              throw new Error("can't retrieve data");
            }
            return;
          });

        return {
          success: true,
          error: '',
        };
      });
    } catch (error) {
      throw new Error();
    }
  }
}
