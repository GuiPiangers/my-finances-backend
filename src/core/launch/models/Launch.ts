import { DateTime } from "../../shared/Date";
import { Entity } from "../../shared/Entity";

export interface LaunchDTO {
  id?: string;
  userId: string;
  date: string;
  description: string;
  type: "revenue" | "expenditure";
  status: "payed" | "payable";
  category?: string;
  value: number;
}

export class Launch extends Entity {
  readonly userId: string;
  readonly date: DateTime;
  readonly description: string;
  readonly type: "revenue" | "expenditure";
  readonly status: "payed" | "payable";
  readonly category: string | undefined;
  readonly value: number;

  constructor({
    id,
    date,
    description,
    status,
    type,
    userId,
    category,
    value,
  }: LaunchDTO) {
    super(id);
    this.userId = userId;
    this.date = new DateTime(date);
    this.description = description;
    this.status = status;
    this.type = type;
    this.category = category;
    this.value = value;
  }
}
