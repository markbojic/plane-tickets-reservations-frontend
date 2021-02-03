import { Injectable } from '@angular/core';
import { Ticket } from '../../models/ticket.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private readonly ticketsUrl = 'http://localhost:8080/api/tickets'
  private tickets: Observable<Ticket[]>

  constructor(private http: HttpClient) { }

  public getTickets(): Observable<Ticket[]> {
    return this.tickets
  }

  public fetchTickets(): Observable<Ticket[]> {
    this.tickets = this.http.get<Ticket[]>(this.ticketsUrl + '/all', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })

    return this.tickets
  }

  public removeTicket(id): Observable<{}> {
    return this.http.delete(this.ticketsUrl + '/' + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
  }

  public updateTicket(prmts): Observable<{}> {
    var body = JSON.stringify(prmts)
    return this.http.put(this.ticketsUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }

  public addTicket(ticket): Observable<{}> {
    var body = JSON.stringify(ticket)
    return this.http.post(this.ticketsUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }

  public findTickets(prmts): Observable<Ticket[]> {
    console.log(prmts)
    let params = new HttpParams().set("origin", prmts.origin).set("destination", prmts.destination).set("departOn", prmts.departOn).set("returnOn", prmts.returnOn)
    this.tickets = this.http.get<Ticket[]>(this.ticketsUrl + '/search', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      params: params
    })

    return this.tickets
  }

}
