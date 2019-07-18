import { Injectable } from '@angular/core';

import { getStorageImplementation } from './local-storage.helpers';

export enum LocalStorageKey {
  AuthToken = 'auth-token'
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly storage: Storage;

  constructor() {
    this.storage = getStorageImplementation();
  }

  set(key: LocalStorageKey, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  get<T = any>(key: LocalStorageKey) {
    const item: T = JSON.parse(this.storage.getItem(key));
    return item;
  }

  remove(key: LocalStorageKey) {
    this.storage.removeItem(key);
  }
}
