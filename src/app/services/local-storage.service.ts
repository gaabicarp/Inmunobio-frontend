import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  USER_KEY = "user_key"
  USER_EMAIL = "user_email"

  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.log('Error saving', e)
    }
  }

  get(key: string): any {
    try {
      let item = localStorage.getItem(key)
      if (item) {
        return JSON.parse(item)
      }
      return ""
    } catch (e) {
      console.log('Error getting data', e)
      return null
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.log('Error removing key', e)
    }
  }

  clear(): void {
    try {
      localStorage.clear()
    } catch (e) {
      console.log('Error cleaning localstorage', e)
    }
  }
}
