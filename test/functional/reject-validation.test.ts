import {ValidationError} from "./../../src/validation/ValidationError.ts";
import {Contains} from "../../src/decorator/decorators.ts";
import {Validator} from "../../src/validation/Validator.ts";
import {describe, expect, it} from "../dept.ts";

class MyClass {
    @Contains("hello", {
        message: "$value is not valid. Your string must contain a hello word"
    })
    someProperty: string | undefined;
}

describe("validateOrReject()", () => {

    it("should resolve promise when no error", () => {
        // expect.assertions(1);
        const validator = new Validator();
        const model = new MyClass();

        model.someProperty = "hello world";
        return validator.validateOrReject(model)
            .then((args) => {
                expect(args).toBeUndefined();
            });
    });

    it("should reject promise on error", () => {
        // expect.assertions(2);
        const validator = new Validator();
        const model = new MyClass();

        model.someProperty = "hell no world";
        return validator.validateOrReject(model)
            .catch((errors: ValidationError[]) => {
                expect(errors.length).toEqual(1);
                expect(errors[0].constraints).toEqual({contains: "hell no world is not valid. Your string must contain a hello word"});
            });
    });
});
