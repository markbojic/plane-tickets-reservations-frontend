import { Injectable } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private readonly reservationsUrl = 'http://localhost:8080/api/reservations'
  private reservations: Observable<Reservation[]>

  constructor(private http: HttpClient) { }

  public getReservations(): Observable<Reservation[]> {
    return this.reservations
  }

  public fetchReservations(): Observable<Reservation[]> {
    this.reservations = this.http.get<Reservation[]>(this.reservationsUrl, {
      params: {},
      headers: {
        Authorization: "Bearer" + localStorage.getItem("jwt")
      }
    })

    return this.reservations
  }

  public removeReservation(id): Observable<{}> {
    return this.http.delete(this.reservationsUrl + '/' + id, {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("jwt")
      }
    })
  }

  public updateReservation(prmts): Observable<{}> {
    var body = JSON.stringify(prmts)
    return this.http.put(this.reservationsUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }

  public addReservation(reservation): Observable<{}> {
    var body = JSON.stringify(reservation)
    return this.http.post(this.reservationsUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }

}
