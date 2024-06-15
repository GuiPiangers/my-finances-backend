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
    const valueDate = this._isLocaleDate(value)
      ? this._localeDateToISO(value)
      : value;
    if (!this._isValidDate(valueDate))
      throw new ApiError("A data informada não é válida", {
        title: "date",
      });

    if (onlyPassDate && !onlyFutureDate) {
      if (this._isPassDate(valueDate))
        throw new ApiError(
          "A data informada precisa ser anterior a data atual",
          { title: "date" },
        );
    }
    if (onlyFutureDate && !onlyPassDate) {
      if (this._isFutureDate(valueDate))
        throw new ApiError(
          "A data informada precisa ser posterior a data atual",
          { title: "date" },
        );
    }

    this.value = new Date(`${valueDate}T12:00`);
  }

  private _isLocaleDate(value: string) {
    const localePattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    return localePattern.test(value);
  }

  private _localeDateToISO(value: string) {
    const localePattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    return value.replace(localePattern, "$3-$2-$1");
  }

  private _isValidDate(value: string) {
    const date = new Date(value);
    return !!date.getTime();
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
