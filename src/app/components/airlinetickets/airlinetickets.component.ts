import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-airlinetickets',
  templateUrl: './airlinetickets.component.html',
  styleUrls: ['./airlinetickets.component.css']
})
export class AirlineticketsComponent implements OnInit {

  public activeAirline: Airline
  public tickets: Ticket[]
  public tmp: Ticket[]
  public isAdmin: boolean
  public user: User

  constructor(private ticketService: TicketService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private airlineService: AirlineService,
              private userService: UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'))
      console.log(id)

      this.airlineService.fatchAirlines().subscribe((airlines: Airline[]) => {
        console.log(airlines)
        this.activeAirline = airlines.filter(airline => airline.id === id)[0]
      })
    })

    this.ticketService.fetchTickets().subscribe(tickets => {
      this.tickets = tickets.filter(ticket => ticket.airline.id === this.activeAirline.id);
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

  public filterOneWay() {
    this.ticketService.fetchTickets().subscribe(tickets => {
      this.tmp = tickets.filter(ticket => ticket.oneWay);
      this.tickets = this.tmp.filter(ticket => ticket.airline.id === this.activeAirline.id);
    });
  }

  public filterReturn() {
    this.ticketService.fetchTickets().subscribe((tickets: Ticket[]) => {
      this.tmp = tickets.filter(ticket => !(ticket.oneWay));
      this.tickets = this.tmp.filter(ticket => ticket.airline.id === this.activeAirline.id);
    });
  }

  public filterAll() {
    this.ticketService.fetchTickets().subscribe(tickets => {
      this.tickets = tickets.filter(ticket => ticket.airline.id === this.activeAirline.id);
    })
  }

  public removeTicket(id) {
    this.ticketService.removeTicket(id).subscribe()
    var index
    var count = 0
    this.tickets.forEach(t => {
      if (t.id == id) {
        index = count
      }
      count++
    })
    this.tickets.splice(index, 1)
  }

  public editTicket(id) {
    this.router.navigate(['/ticket/edit/' + id])
  }

}
