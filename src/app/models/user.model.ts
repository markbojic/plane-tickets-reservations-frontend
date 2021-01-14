import { UserType } from './usertype.model';
import { Reservation } from './reservation.model';

export interface User {
    id: number
    username: string
    type: UserType
    bookings: Reservation[]
}