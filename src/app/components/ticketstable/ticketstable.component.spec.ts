import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketstableComponent } from './ticketstable.component';

describe('TicketstableComponent', () => {
  let component: TicketstableComponent;
  let fixture: ComponentFixture<TicketstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketstableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
