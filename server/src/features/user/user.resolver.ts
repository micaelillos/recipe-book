import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { identity } from "rxjs";
import { DB } from "../db/db";
import { Error } from "../shared/error.model";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Resolver(of => User )
export class UsersResolver {
    constructor(private userService: UserService) { }

    @Query(() => User)
    async getAllUsers() {
        return this.userService.getUsers()
    }

    @Mutation(() => User)
    async addUser(
        @Args('id', { type: () => String }) id,
        @Args('email', { type: () => String  }) email,
        @Args('password', { type: () => String }) password,
    ) {
        const newUser: User = { id, email, password }
        return this.userService.addUser(newUser)
    }

    


}