import { Injectable } from '@nestjs/common';
import { DB } from '../db/db';
import { User } from './user.model';

@Injectable()
export class UserService {

    getUsers () {
        return DB.users;
    }

    addUser (user: User){
        // validate user todo
        DB.users.push(user)
        return user
    }
}
