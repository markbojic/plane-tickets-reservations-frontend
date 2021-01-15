import { Airline } from './airline.model';
import { Flight } from './flight.model';

export interface Ticket {
    id: number
    airline: Airline
    oneWay: boolean
    departOn: Date
    returnOn: Date
    flight: Flight
    count: number
}