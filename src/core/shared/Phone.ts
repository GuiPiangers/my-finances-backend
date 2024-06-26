import { ApiError } from "../../utils/ApiError";

export class Phone {
  constructor(readonly value: string) {
    const pattern = /^[(][0-9]{2}[)][ ][0-9]{5}[ ][0-9]{4}$/;
    if (!pattern.test(value))
      throw new ApiError("Número de telefone fora do padrão esperado", {});
  }
}
