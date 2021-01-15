import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineinfoComponent } from './airlineinfo.component';

describe('AirlineinfoComponent', () => {
  let component: AirlineinfoComponent;
  let fixture: ComponentFixture<AirlineinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
