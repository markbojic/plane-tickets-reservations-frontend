import { Airline } from './airline.model';
import { Flight } from './flight.model';

export interface Ticket {
    id: number
    airline: Airline
    oneway: boolean
    departon: Date
    returnon: Date
    flight: Flight
    count: number
}