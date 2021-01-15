import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineticketsComponent } from './airlinetickets.component';

describe('AirlineticketsComponent', () => {
  let component: AirlineticketsComponent;
  let fixture: ComponentFixture<AirlineticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineticketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
