import { Component, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navElement: HTMLElement = null;
  public user: User
  public isAdmin: boolean

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe(users => {
      for(let i=0 ; i < users.length ; i++) {
        if(users[i].username === localStorage.getItem("usrnme")) {
          this.user = users[i];
          //console.log(this.user.username + ' ' + this.user.userType);
          if (this.user.userType.toString() === "ADMIN") {
            this.isAdmin = true;
          } else {
            this.isAdmin = false;
          }
        }
      }
    })
  }

  ngAfterViewInit() {
    this.navElement = <HTMLElement> document.getElementById("navbar");
  }

  @HostListener("window:scroll", ["$event"])
  onScroll($event: Event) {
    let scrollFactor = 200;
    let opacity = (window.pageYOffset / scrollFactor);
    opacity = opacity < 1 ? opacity : 1;

    if (opacity <= 1) {
      this.navElement.style.backgroundColor = "rgba(255, 255, 255, " + opacity + ")";
    }

    if (window.pageYOffset / scrollFactor > 1) {
      this.navElement.classList.add("navbar-shadow");
    } else {
      this.navElement.classList.remove("navbar-shadow");
    }
  }

  public rsrv() {
    alert('COOMING SOON')
  }

}
