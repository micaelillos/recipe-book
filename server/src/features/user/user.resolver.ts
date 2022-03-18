import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { identity } from "rxjs";
import { DB } from "../db/db";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Resolver(of => User)
export class UsersResolver {
    constructor(private userService: UserService) { }

    @Query(() => [User])
    async getAllUser() {
        return DB.users
    }

    @Mutation(() => User)
    async addUser(@Args('id',{type: () => String})id) {
        const newUser: User= {id,email:'email',password:'password'}
        DB.users.push(newUser)
        return newUser
    }
  

}