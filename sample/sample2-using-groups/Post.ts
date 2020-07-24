import {Contains, IsDate, IsEmail, IsFQDN, IsInt, Length} from "../../src/decorator/decorators.ts";

export class Post {

    @Length(10, 20, {
        message: "Incorrect length!",
        groups: ["users", "moderators"]
    })
    @Length(0, 20, {
        message: "Incorrect length!",
        groups: ["admins"]
    })
    title: string | undefined;

    @Contains("hello", {
        message: "It should contain word \"hello!\"",
        groups: ["users", "moderators"]
    })
    text: string | undefined;

    @IsInt()
    rating: number | undefined;

    @IsEmail(undefined, {
        always: true
    })
    email: string | undefined;

    @IsFQDN(undefined, {
        message: "Site address should be correct",
        groups: ["users"]
    })
    site: string | undefined;

    @IsDate()
    createDate: Date | undefined;

}
