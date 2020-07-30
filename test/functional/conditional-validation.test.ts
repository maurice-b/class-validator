import {Equals, IsNotEmpty, IsOptional, ValidateIf} from "../../src/decorator/decorators.ts";
import {Validator} from "../../src/validation/Validator.ts";

import {describe, expect, it} from "../dept.ts";


const validator = new Validator();

describe("conditional validation", () => {
    it("shouldn't validate a property when the condition is false", () => {
        // expect.assertions(1);

        class MyClass {
            @ValidateIf(_o => false)
            @IsNotEmpty()
            title: string | undefined;
        }

        const model = new MyClass();
        return validator.validate(model).then(errors => {
            expect(errors.length).toEqual(0);
        });
    });

    it("should validate a property when the condition is true", () => {
        // expect.assertions(5);

        class MyClass {
            @ValidateIf(_o => true)
            @IsNotEmpty()
            title: string = "";
        }

        const model = new MyClass();
        return validator.validate(model).then(errors => {
            expect(errors.length).toEqual(1);
            expect(errors[0].target).toEqual(model);
            expect(errors[0].property).toEqual("title");
            expect(errors[0].constraints).toEqual({isNotEmpty: "title should not be empty"});
            expect(errors[0].value).toEqual("");
        });
    });

    it("should pass the object being validated to the condition function", () => {
        // expect.assertions(3);

        class MyClass {
            @ValidateIf(o => {
                expect(o).toBeInstanceOf(MyClass);
                expect(o.title).toEqual("title");
                return true;
            })
            @IsNotEmpty()
            title: string = "title";
        }

        const model = new MyClass();
        return validator.validate(model).then(errors => {
            expect(errors.length).toEqual(0);
        });
    });

    it("should validate a property when value is empty", () => {
        // expect.assertions(5);

        class MyClass {
            @IsOptional()
            @Equals("test")
            title: string = "";
        }

        const model = new MyClass();
        return validator.validate(model).then(errors => {
            expect(errors.length).toEqual(1);
            expect(errors[0].target).toEqual(model);
            expect(errors[0].property).toEqual("title");
            expect(errors[0].constraints).toEqual({equals: "title must be equal to test"});
            expect(errors[0].value).toEqual("");
        });
    });

    it("should validate a property when value is supplied", () => {
        class MyClass {
            @IsOptional()
            @Equals("test")
            title: string = "bad_value";
        }

        const model = new MyClass();
        return validator.validate(model).then(errors => {
            expect(errors.length).toEqual(1);
            expect(errors[0].target).toEqual(model);
            expect(errors[0].property).toEqual("title");
            expect(errors[0].constraints).toEqual({equals: "title must be equal to test"});
            expect(errors[0].value).toEqual("bad_value");
        });
    });
});