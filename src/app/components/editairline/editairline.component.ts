import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editairline',
  templateUrl: './editairline.component.html',
  styleUrls: ['./editairline.component.css']
})
export class EditairlineComponent implements OnInit {

  public airline: Airline
  public editAirlineForm: FormGroup

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private airlineService: AirlineService) {
                this.editAirlineForm = this.formBuilder.group({
                  id: [''],
                  name: ['', Validators.required]
                })
              }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id: number = Number(params.get('id'))
      
      this.airlineService.getAirlines().subscribe((airlines: Airline[]) => {
        this.airline = airlines.filter(airline => airline.id === id)[0]
        console.log(this.airline)
      })
    })
  }

  public get id() {
    return this.editAirlineForm.get('id')
  }

  public get name() {
    return this.editAirlineForm.get('name')
  }

  public submitForm(prmts) {
    this.airlineService.updateAirline(prmts).subscribe()
  }

}
