import { inject, injectable } from "tsyringe";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "../repositories/IUsersRepository";
import { EmailOrPasswordIncorrectException } from "../exceptions/EmailOrPasswordIncorrectException";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new EmailOrPasswordIncorrectException();
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new EmailOrPasswordIncorrectException();
    }

    const token = sign({}, "a7b71b7b48466113992530a9900c2462", {
      subject: user.id,
      expiresIn: "1d"
    });

    const response: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    };

    return response;
  }
}
