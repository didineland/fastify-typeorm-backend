import { Login } from "../interfaces/login.interface";
import { User } from "../models/user.model";

export class UserService {

  private static _instance: UserService;
  public static get instance(): UserService {
    return  UserService._instance;
  }

  constructor() {
    UserService._instance = this;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return User.findOne({email});
  }

  async getAll(email: string): Promise<User | undefined>{
    return User.findOneOrFail({email});
  }

  async logUser(log: Login): Promise<User> {
    return User.findOneOrFail({email: log.email, password: log.password});
  }

}