import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_LOWERCASE = "isLowercase";

/**
 * Checks if the string is lowercase.
 * If given value is not a string, then it returns false.
 */
export function isLowercase(value: unknown): boolean {
    return typeof value === "string" && validator.isLowerCase(value);
}

/**
 * Checks if the string is lowercase.
 * If given value is not a string, then it returns false.
 */
export function IsLowercase(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_LOWERCASE,
            validator: {
                validate: (value, _args): boolean => isLowercase(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a lowercase string",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
