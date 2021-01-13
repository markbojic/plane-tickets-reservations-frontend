import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated() {
    
    let token = localStorage.getItem('jwt');

    // check if token is set
    if (token) {
        return true;
    }

    return false;
  }

}
