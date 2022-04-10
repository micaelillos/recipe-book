import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Error } from "../shared/error.model";

@ObjectType()
export class User extends Error {
    @Field(() => String)
    id: number

    @Field(() => String)
    email: string

    @Field(() => String)
    password: string
}