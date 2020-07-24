import {Allow, IsDefined, Min} from "../../src/decorator/decorators.ts";
import {Validator} from "../../src/validation/Validator.ts";
import {ValidationTypes} from "../../src/mod.ts";

import {expect} from "../dept.ts";

const validator = new Validator();


Deno.test("[whitelist validation] should strip non whitelisted properties, but leave whitelisted untouched", () => {

    class MyClass {
        @IsDefined()
        title: string | undefined;

        @Min(0)
        views: number | undefined;
    }

    const model: any = new MyClass();

    model.title = "hello";
    model.views = 56;
    model.unallowedProperty = 42;
    return validator.validate(model, {whitelist: true}).then(errors => {
        expect(errors.length).toEqual(0);
        expect(model.unallowedProperty).toBeUndefined();
        expect(model.title).toEqual("hello");
        expect(model.views).toEqual(56);
    });
});

Deno.test("[whitelist validation] should be able to whitelist with @Allow", () => {
    class MyClass {
        @Allow()
        views: number | undefined;
    }

    const model: any = new MyClass();

    model.views = 420;
    model.unallowedProperty = "non-whitelisted";

    return validator.validate(model, {whitelist: true}).then(errors => {
        expect(errors.length).toEqual(0);
        expect(model.unallowedProperty).toBeUndefined();
        expect(model.views).toEqual(420);
    });
});

Deno.test("[whitelist validation] should throw an error when forbidNonWhitelisted flag is set", () => {

    class MyClass {
    }

    const model: any = new MyClass();

    model.unallowedProperty = "non-whitelisted";

    return validator.validate(model, {whitelist: true, forbidNonWhitelisted: true}).then(errors => {
        expect(errors.length).toEqual(1);
        expect(errors[0].target).toEqual(model);
        expect(errors[0].property).toEqual("unallowedProperty");
        expect(errors[0].constraints).toHaveProperty(ValidationTypes.WHITELIST);
    });
});
