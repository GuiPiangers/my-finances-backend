/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateTime } from "../../shared/Date";
import { Entity } from "../../shared/Entity";

type typeEnum = "revenue" | "expenditure";

export interface LaunchDTO {
  id?: string;
  userId: string;
  date: string;
  description: string;
  type: typeEnum;
  status: "payed" | "payable";
  category?: string;
  value: number;
}

export class Launch extends Entity {
  readonly userId: string;
  readonly date: DateTime;
  readonly description: string;
  readonly type: typeEnum;
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
    const valueModule = Math.abs(value);
    super(id);
    this.userId = userId;
    this.date = new DateTime(date);
    this.description = description;
    this.status = status;
    this.type = type;
    this.category = category;
    this.value = type === "revenue" ? valueModule : -valueModule;
  }

  getDTO() {
    return {
      id: this.id,
      date: this.date.ISODate,
      description: this.description,
      status: this.status,
      type: this.type,
      userId: this.userId,
      category: this.category,
      value: this.value,
    };
  }

  update(data: Partial<LaunchDTO>) {
    const { id, userId, ...launchData } = data;
    const launchDTO = this.getDTO();
    return new Launch({ ...launchDTO, ...launchData });
  }
}
