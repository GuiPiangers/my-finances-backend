import { ApiError } from "../../utils/ApiError";

type DateTimeConfig = {
  onlyPassDate?: boolean;
  onlyFutureDate?: boolean;
};

export class DateTime {
  public value: Date;

  constructor(
    value: string,
    { onlyPassDate, onlyFutureDate }: DateTimeConfig = {},
  ) {
    if (!this._isValidDate(value))
      throw new ApiError("A data informada não é válida", {
        title: "date",
      });

    if (onlyPassDate && !onlyFutureDate) {
      if (this._isPassDate(value))
        throw new ApiError(
          "A data informada precisa ser anterior a data atual",
          { title: "date" },
        );
    }
    if (onlyFutureDate && !onlyPassDate) {
      if (this._isFutureDate(value))
        throw new ApiError(
          "A data informada precisa ser posterior a data atual",
          { title: "date" },
        );
    }

    this.value = new Date(value);
  }

  private _isValidDate(dateString: string) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  private _isPassDate(value: string) {
    const date = new Date(value);
    const now = new Date();
    return date < now;
  }

  private _isFutureDate(value: string) {
    return !this._isPassDate(value);
  }

  get ISODate() {
    return this.value.toISOString().substring(0, 10);
  }

  get localeDate() {
    return this.value.toLocaleDateString();
  }

  get time() {
    return `${this.value.getHours()}:${this.value.getMinutes()}`;
  }
}
