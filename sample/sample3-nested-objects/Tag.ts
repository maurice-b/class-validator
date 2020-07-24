import {Length} from "../../src/decorator/decorators.ts";

export class Tag {

    @Length(10, 20, {
        message: "Tag is too short or long"
    })
    name: string | undefined;

}
