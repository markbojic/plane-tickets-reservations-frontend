import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { Flight } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/services/flight/flight.service';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css']
})
export class AddticketComponent implements OnInit {

  public ticket: Ticket
  public editForm: FormGroup
  public airlines: Airline[]
  public flights: Flight[]

  constructor(private formBuilder: FormBuilder,
              private ticketService: TicketService,
              private airlineService: AirlineService,
              private flightService: FlightService
  ) { 
    this.editForm = this.formBuilder.group({
      airline: ['', Validators.required],
      oneWay: [''],
      departOn: ['', Validators.required],
      returnOn: [''],
      flight: ['', Validators.required],
      count: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.airlineService.fatchAirlines().subscribe((airlines: Airline[]) => {
      this.airlines = airlines;
    })
    this.flightService.fetchFlights().subscribe((flights: Flight[]) => {
      this.flights = flights;
    })
  }

  public get airline(){
    return this.editForm.get('airline')
  }

  public get oneWay(){
    return this.editForm.get('oneWay')
  }

  public get departOn(){
    return this.editForm.get('departOn')
  }

  public get returnOn(){
    return this.editForm.get('returnOn')
  }

  public get flight(){
    return this.editForm.get('flight')
  }

  public get count(){
    return this.editForm.get('count')
  }

  public submitForm(prmts) {
    //console.log(prmts.airline)
    //console.log(prmts.flight)
    var isOk: boolean = true
    
    var tkt = {id: 0, airline: prmts.airline, oneWay: prmts.oneWay, departOn: prmts.departOn, returnOn: prmts.returnOn, flight: prmts.flight, count: prmts.count};
    this.airlines.forEach(airl => {
      if (airl.name === prmts.airline) {
        tkt.airline = airl;
      }
    })
    this.flights.forEach( fl => {
      var tmp = fl.origin.name + ' -> ' + fl.destination.name;
      if (tmp === prmts.flight) {
        tkt.flight = fl;
      }
    })

    if ((prmts.oneWay as boolean === false) && (prmts.returnOn === null)) {
      alert('PLESE ADD RETURN DATE')
      isOk = false
    }

    if (prmts.oneWay as boolean) {
      tkt.returnOn = null
    }

    if (!prmts.oneWay as boolean) {
      if (prmts.returnOn < prmts.departOn) {
        alert('DATE ERROR')
        isOk = false
      }
    }

    if (prmts.count == 0) {
      alert('YOU CAN NOT ADD 0 TICKETS')
      isOk = false
    }
    console.log(tkt)
    if (isOk){
      this.ticketService.addTicket(tkt).subscribe(data => {
        console.log('new ticket added')
        this.editForm.get('airline').setValue('')
        this.editForm.get('oneWay').setValue('')
        this.editForm.get('flight').setValue('')
        this.editForm.get('departOn').setValue('')
        this.editForm.get('returnOn').setValue('')
        this.editForm.get('count').setValue('')
      })
    }
    
  }

}
