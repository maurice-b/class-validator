import {Length} from "../../src/decorator/decorators.ts";

export class Tag {

    @Length(10, 20, {
        message: "Tag value is too short or long"
    })
    value: string | undefined;

}
