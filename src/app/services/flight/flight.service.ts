import { Injectable } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private readonly flightsUrl = 'http://localhost:8080/api/flights'
  private flights: Observable<Flight[]>

  constructor(private http: HttpClient) { }
  
  public getFlights(): Observable<Flight[]> {
    return this.flights
  }

  public fetchFlights(): Observable<Flight[]> {
    this.flights = this.http.get<Flight[]>(this.flightsUrl + '/all', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })

    return this.flights
  }

  public removeFlight(id): Observable<{}> {
    return this.http.delete(this.flightsUrl + '/' + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
  }

  public updateFlight(prmts): Observable<{}> {
    var body = JSON.stringify(prmts)
    return this.http.put(this.flightsUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }

  public addFlight(flight): Observable<{}> {
    var body = JSON.stringify(flight)
    return this.http.post(this.flightsUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }

}
