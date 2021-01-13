import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credentials } from 'src/app/models/credentials.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly loginUrl = 'http://localhost:8080/auth/login'

  constructor(private http: HttpClient) { }

  login(credentials) {
    var body = JSON.stringify(credentials);

    return this.http.post(this.loginUrl, body, {
      params: {}, 
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(map( (responseData: Credentials) => {
      console.log(responseData)
      localStorage.setItem("jwt", responseData.jwt)
      localStorage.setItem("usrnme", responseData.username)
    }))
  } 
}