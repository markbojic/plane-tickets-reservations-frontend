import { Injectable } from '@angular/core';
import { City } from '../../models/city.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private readonly citiesUrl = 'http://localhost:8080/api/cities'
  private cities: Observable<City[]>

  constructor(private http: HttpClient) { }

  public getCities(): Observable<City[]> {
    return this.cities
  }

  public fetchCities(): Observable<City[]> {
    this.cities = this.http.get<City[]>(this.citiesUrl + '/all', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })

    return this.cities
  }

  public removeCity(id): Observable<{}> {
    return this.http.delete(this.citiesUrl + '/' + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
  }

  public updateCity(prmts): Observable<{}> {
    var body = JSON.stringify(prmts)
    return this.http.put(this.citiesUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }

  public addCity(city): Observable<{}> {
    var body = JSON.stringify(city)
    return this.http.post(this.citiesUrl, body, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json'
      }
    })
  }

}
