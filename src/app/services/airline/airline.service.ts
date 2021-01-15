import { Injectable } from '@angular/core';
import { Airline } from '../../models/airline.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  private readonly airlinesUrl = 'http://localhost:8080/api/airlines'
  private airlines: Observable<Airline[]>

  constructor(private http: HttpClient) { }

  public getAirlines(): Observable<Airline[]> {
    return this.airlines
  }

  public fatchAirlines(): Observable<Airline[]> {
    this.airlines = this.http.get<Airline[]>(this.airlinesUrl + '/all', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })

    return this.airlines
  }

  public removeAirline(id): Observable<{}> {
    return this.http.delete(this.airlinesUrl + '/' + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
  }

  public updateAirline(prmts): Observable<{}> {
    var body = JSON.stringify(prmts)
    return this.http.put(this.airlinesUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }

  public addAirline(airline): Observable<{}> {
    var body = JSON.stringify(airline)
    return this.http.post(this.airlinesUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }

}
