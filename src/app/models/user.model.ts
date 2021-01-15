import { UserType } from './usertype.model';
import { Reservation } from './reservation.model';

export interface User {
    id: number
    username: string
    userType: UserType
    bookings: Reservation[]
}