import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-airlineinfo',
  templateUrl: './airlineinfo.component.html',
  styleUrls: ['./airlineinfo.component.css']
})
export class AirlineinfoComponent implements OnInit {

  public activeAirline: Airline
  public isAdmin: boolean
  public user: User

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private airlineService: AirlineService,
              private userService: UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'))
      //console.log(id)
      this.airlineService.fatchAirlines().subscribe((airlines: Airline[]) => {
        console.log(airlines)
        this.activeAirline = airlines.filter(airline => airline.id === id)[0]
      })
    })

    this.userService.fetchUsers().subscribe(users => {
      this.user = users.filter(user => user.username === localStorage.getItem('usrnme'))[0]
      if (this.user.userType.toString() === "ADMIN") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    })
    
  }

  public remove() {
    this.airlineService.removeAirline(this.activeAirline.id).subscribe()
    this.router.navigate([''])
  }

}
