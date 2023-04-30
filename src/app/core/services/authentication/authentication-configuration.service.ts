import { Injectable } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
// LIBS
import { BehaviorSubject, Observable, tap } from 'rxjs';
// SERVICES
import { LocalStorageService } from '../storage/local-storage.service';
// MODELS
import { User, UserCredential } from '@models/authentication/User';
import { StorageKeys } from '@constants/StorageKeys';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationConfigurationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(
    private localStorageService: LocalStorageService,
    private location: Location,
    private router: Router,
    ) {
    const user = this.loadUserStorage();
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  start(user: UserCredential) {
    this.localStorageService.storeObject(StorageKeys.UserKey, user.user);
    this.localStorageService.storeItem(StorageKeys.JwtKey, user.accessToken);
    this.currentUserSubject.next(user.user);
  }

  reset() {
    this.localStorageService.remove(StorageKeys.UserKey);
    this.localStorageService.remove(StorageKeys.JwtKey);
    this.currentUserSubject.next(null);
    this.location.replaceState('/auth/sign-in');
    this.router.navigate(['/sign-in'], { replaceUrl: true, skipLocationChange: true });
  }

  loadUserStorage() : User {
    return this.localStorageService.getObject(StorageKeys.UserKey);
  }
}
