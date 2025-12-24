import type { CreateUserInput,User} from "./user.types";
import { AppError } from "../../utils/AppError";

const users:User[] = [];

export class UserService {
    async createUser(data:CreateUserInput):Promise<User> {
        const newUser:User = {
            id: users.length + 1,
            ...data
        };
        users.push(newUser);
        return newUser;
    }
    async getUsers():Promise<User[]> {
        return users;
    }
}