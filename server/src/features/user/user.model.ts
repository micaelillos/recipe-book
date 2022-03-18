import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(() => String)
    id: number

    @Field(() => String)
    email: string

    @Field(() => String)
    password: string
}