import { UserType } from './usertype.model'

export interface User {
    id: number
    username: string
    type: UserType
    //bookings
}