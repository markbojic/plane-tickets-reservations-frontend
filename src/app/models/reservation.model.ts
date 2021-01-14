import { Flight } from './flight.model';
import { Ticket } from './ticket.model';

export interface Reservation {
    id: number
    isAvailable: boolean
    flight: Flight
    ticket: Ticket
}