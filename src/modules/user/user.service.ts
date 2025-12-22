import type { CreateUserInput,User} from "./user.types";
import { AppError } from "../../utils/AppError";

const users:User[] = [];

export class UserService {
    async createUser(data:CreateUserInput):Promise<User> {
        if(!data.email){
            throw new AppError("Email is required",400);
        }
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