export interface CreateUserInput {
  name: string;
  email: string;
}

export interface User extends CreateUserInput {
    id:number;
}

export interface CreateUserBody {
  name: string;
  email: string;
}