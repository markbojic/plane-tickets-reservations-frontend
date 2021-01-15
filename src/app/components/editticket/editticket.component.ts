import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-editticket',
  templateUrl: './editticket.component.html',
  styleUrls: ['./editticket.component.css']
})
export class EditticketComponent implements OnInit {

  public ticket: Ticket
  public editForm: FormGroup

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private ticketService: TicketService
  ) {
    this.editForm = this.formBuilder.group({
      id: [''],
      airline: [''],
      oneWay: [''],
      departOn: ['', Validators.required],
      returnOn: [''],
      flightId: ['', Validators.required],
      count: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'))
      
      this.ticketService.getTickets().subscribe((tickets: Ticket[]) => {
        this.ticket = tickets.filter(ticket => ticket.id === id)[0]
      })
    })
  }

  public get id(){
    return this.editForm.get('id')
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

  public get flightId(){
    return this.editForm.get('flightId')
  }

  public get count(){
    return this.editForm.get('count')
  }

  public submitForm(prmts) {
    console.log(prmts)
    var tkt = {id: prmts.id, airline: this.ticket.airline, oneWay: prmts.oneWay, departOn: prmts.departOn, returnOn: prmts.returnOn, flight: this.ticket.flight, count: prmts.count};
    this.ticketService.updateTicket(tkt).subscribe(data => {
      this.router.navigate([''])
    })
  }

}
