import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isAdmin: boolean
  public user: User

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe(users => {
      this.user = users.filter(user => user.username === localStorage.getItem('usrnme'))[0]
      if (this.user.userType.toString() === "ADMIN") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    })
    
  }

}
