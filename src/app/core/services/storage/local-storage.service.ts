import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {

  constructor() { }

  // STORE ITEM IN LOCALSTORAGE
  storeItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  // STORE OBJECT IN LOCALSTORAGE
  storeObject(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // GET ITEM STORE IN LOCALSTORAGE
  getItem(key: string): string {
    return localStorage.getItem(key) || '';
  }

  // GET OBJECT STORE IN LOCALSTORAGE
  getObject(key: string): any {
    const object = localStorage.getItem(key);
    return object ? JSON.parse(object) : null;
  }

  // REMOVE ITEM OR OBJECT STORE IN LOCALSTORAGE
  remove(key: string) {
    localStorage.removeItem(key);
  }
}
