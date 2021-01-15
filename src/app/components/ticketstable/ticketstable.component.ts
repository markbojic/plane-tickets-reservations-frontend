import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-ticketstable',
  templateUrl: './ticketstable.component.html',
  styleUrls: ['./ticketstable.component.css']
})
export class TicketstableComponent implements OnInit {

  public tickets: Ticket[]

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.fetchTickets().subscribe(tickets => {
      this.tickets = tickets;
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
    this.ticketService.fetchTickets().subscribe(tickets => {
      this.tickets = tickets.filter(ticket => ticket.oneWay);
    });
  }

  public filterReturn() {
    this.ticketService.fetchTickets().subscribe((tickets: Ticket[]) => {
      this.tickets = tickets.filter(ticket => !(ticket.oneWay));
    });
  }

  public filterAll() {
    this.ticketService.fetchTickets().subscribe(tickets => {
      this.tickets = tickets;
    })
  }

}
