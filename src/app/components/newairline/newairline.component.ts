import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Airline } from 'src/app/models/airline.model';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newairline',
  templateUrl: './newairline.component.html',
  styleUrls: ['./newairline.component.css']
})
export class NewairlineComponent implements OnInit {

  public airline: Airline
  public newAirlineForm: FormGroup

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private airlineService: AirlineService) {
                this.newAirlineForm = this.formBuilder.group({
                  name: ['', Validators.required]
                })
              }

  ngOnInit(): void {
  }

  public get name() {
    return this.newAirlineForm.get('name')
  }

  public submitForm(prmts) {
    var air = {id: 0, name: prmts.name}
    this.airlineService.addAirline(air).subscribe()
    this.newAirlineForm.get('name').setValue('')
  }

}
