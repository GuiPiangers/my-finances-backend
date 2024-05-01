import { Email } from "../../shared/Email";
import { Entity } from "../../shared/Entity";
import { Password } from "../../shared/Password";
import { Phone } from "../../shared/Phone";

export interface UserDTO {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export class User extends Entity {
  readonly name: string;
  private _password: Password;
  private _email: Email;
  private _phone: Phone;

  constructor(props: UserDTO) {
    super(props.id);
    this.name = props.name;
    this._email = new Email(props.email);
    this._phone = new Phone(props.phone);
    this._password = new Password(props.password);
  }

  get email() {
    return this._email.value;
  }

  get phone() {
    return this._phone.value;
  }

  async getPasswordHash() {
    return await this._password.getHash();
  }

  async getDTO(): Promise<UserDTO> {
    return {
      id: this.id,
      email: this.email,
      password: await this.getPasswordHash(),
      name: this.name,
      phone: this.phone,
    };
  }
}
