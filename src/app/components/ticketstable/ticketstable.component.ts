import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { PaginationResponse } from 'src/app/models/paginationResponse.model';

@Component({
  selector: 'app-ticketstable',
  templateUrl: './ticketstable.component.html',
  styleUrls: ['./ticketstable.component.css']
})
export class TicketstableComponent implements OnInit {

  public tickets: Ticket[]
  public isAdmin: boolean
  public user: User
  public paginationResponse: PaginationResponse

  public currPage: number = 1;
  public tixPerPage: number = 5;
  public maxPages: number;

  constructor(private ticketService: TicketService,
              private userService: UserService
              ) { }

  ngOnInit(): void {
    this.ticketService.fetchTickets(this.currPage, this.tixPerPage, "", "", "", "").subscribe(paginationResponse => {
      this.paginationResponse = paginationResponse
      this.tickets = paginationResponse.tickets
      this.maxPages = paginationResponse.pageInfo.maxPages
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

  public remove(id) {
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

  public filterOneWay() {
    this.ticketService.fetchTickets(this.currPage, this.tixPerPage, "", "", "", "").subscribe(paginationResponse => {
      this.tickets = paginationResponse.tickets.filter(ticket => ticket.oneWay);
    });
  }

  public filterReturn() {
    this.ticketService.fetchTickets(this.currPage, this.tixPerPage, "", "", "", "").subscribe(paginationResponse => {
      this.tickets = paginationResponse.tickets.filter(ticket => !(ticket.oneWay));
    });
  }

  public filterAll() {
    this.ticketService.fetchTickets(this.currPage, this.tixPerPage, "", "", "", "").subscribe(paginationResponse => {
      this.tickets = paginationResponse.tickets;
    })
  }

  public findTickets() {
    let or = (document.getElementById("from") as HTMLInputElement).value;
    let de = (document.getElementById("to") as HTMLInputElement).value;
    let depOn = (document.getElementById("input-start") as HTMLInputElement).value;
    let retOn = (document.getElementById("input-end") as HTMLInputElement).value;

    let prmts = {origin: or, destination: de, departOn: depOn, returnOn: retOn}
    //console.log(prmts);
    this.ticketService.findTickets(prmts).subscribe(tickets => {
      this.tickets = tickets
    })
  }

  public rsrv(id) {
    alert('YOU RESERVED TICKET')
  }

  public nextPage() {
    this.currPage++;
    this.changePage()
  }

  public previousPage() {
    this.currPage--;
    this.changePage()
  }

  public changePage() {
    let or = (document.getElementById("from") as HTMLInputElement).value;
    let de = (document.getElementById("to") as HTMLInputElement).value;
    let depOn = (document.getElementById("input-start") as HTMLInputElement).value;
    let retOn = (document.getElementById("input-end") as HTMLInputElement).value;

    this.ticketService.fetchTickets(this.currPage, this.tixPerPage, or, de, depOn, retOn).subscribe(paginationResponse => {
      this.paginationResponse = paginationResponse;
      this.tickets = paginationResponse.tickets;
    });
  }

}
