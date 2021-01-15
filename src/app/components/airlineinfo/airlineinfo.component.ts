import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-airlineinfo',
  templateUrl: './airlineinfo.component.html',
  styleUrls: ['./airlineinfo.component.css']
})
export class AirlineinfoComponent implements OnInit {

  public activeAirline: Airline

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private airlineService: AirlineService
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
  }

  public remove() {
    this.airlineService.removeAirline(this.activeAirline.id).subscribe()
    this.router.navigate([''])
  }

}
