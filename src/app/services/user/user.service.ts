import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersUrl = 'http://localhost:8080/api/users'
  private users: Observable<User[]>

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.users
  }

  public fetchUsers(): Observable<User[]> {
    this.users = this.http.get<User[]>(this.usersUrl + '/all', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })

    return this.users
  }

  public removeUser(id): Observable<{}> {
    return this.http.delete(this.usersUrl + '/' + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
  }

  public updateUser(prmts): Observable<{}> {
    var body = JSON.stringify(prmts)
    return this.http.put(this.usersUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }

  public addUser(user): Observable<{}> {
    var body = JSON.stringify(user)
    return this.http.post(this.usersUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }
}
