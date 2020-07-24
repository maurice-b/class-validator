import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_UPPERCASE = "isUppercase";

/**
 * Checks if the string is uppercase.
 * If given value is not a string, then it returns false.
 */
export function isUppercase(value: unknown): boolean {
    return typeof value === "string" && validator.isUpperCase(value);
}

/**
 * Checks if the string is uppercase.
 * If given value is not a string, then it returns false.
 */
export function IsUppercase(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_UPPERCASE,
            validator: {
                validate: (value, _args): boolean => isUppercase(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be uppercase",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
