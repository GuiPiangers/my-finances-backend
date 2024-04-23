import { Entity } from "../../shared/Entity";

export interface LaunchDTO {
    id?: string
    userId: string
    date: string
    description: string
    type: 'revenue' | 'expenditure'
    status: 'payed' | 'payable'
    category?: string
}

export class Launch extends Entity {
    readonly userId: string;
    readonly date: string;
    readonly description: string;
    readonly type: string;
    readonly status: string;
    readonly category: string | undefined;


    constructor({id, date, description, status, type, userId, category}: LaunchDTO){
        super(id)
        this.userId = userId
        this.date = date
        this.description = description
        this.status = status
        this.type = type
        this.category = category
    }
}