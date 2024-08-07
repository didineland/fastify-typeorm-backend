import { Login } from "../interfaces/login.interface";
import { User } from "../models/user.model";
import { hash, compare } from 'bcrypt'
import { UserRole } from "../enums/user-role.enum";
import { PostUser } from "../interfaces/create-user.interface";

export class UserService {

  private static _instance: UserService;
  public static get instance(): UserService {
    return UserService._instance;
  }

  constructor() {
    UserService._instance = this;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return User.findOne({ email });
  }

  async getAll(email: string): Promise<User | undefined> {
    return User.findOneOrFail({ email });
  }

  async logUser(log: Login): Promise<User> {
    const user = await User.findOneOrFail({
      email: log.email
    });

    const same = await compare(log.password, user.password);

    if(!same) {
      throw "Wrond password"
    }

    return user;
  }

  async createUser(postUser: PostUser): Promise<User> {
    let user = new User();
    user.email = postUser.email;
    user.password = await hash(postUser.password, 10);
    user.role = postUser.role

    return User.save(user)
  }

}