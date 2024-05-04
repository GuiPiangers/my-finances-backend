import { Email } from "../../shared/Email";
import { Entity } from "../../shared/Entity";
import { Password } from "../../shared/Password";
import { Phone } from "../../shared/Phone";

export interface UserDTO {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  emailVerified?: boolean;
}

export class User extends Entity {
  readonly name: string;
  readonly password?: Password;
  readonly emailVerified: boolean;
  private _email: Email;
  private _phone?: Phone;

  constructor(props: UserDTO) {
    super(props.id);
    this.name = props.name;
    this._email = new Email(props.email);
    this.emailVerified = props.emailVerified || false;
    if (props.phone) this._phone = new Phone(props.phone);
    if (props.password) this.password = new Password(props.password);
  }

  get email() {
    return this._email.value;
  }

  get phone() {
    return this._phone?.value;
  }

  async getDTO(): Promise<UserDTO> {
    return {
      id: this.id,
      email: this.email,
      password: await this.password?.getHash(),
      name: this.name,
      phone: this.phone,
      emailVerified: this.emailVerified,
    };
  }
}
