import { Ticket } from './ticket.model';
import { PageInfo } from './pageInfo.model';

export interface PaginationResponse {
    tickets: Ticket[]
    pageInfo: PageInfo
}