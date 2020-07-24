import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_OCTAL = "isOctal";

/**
 * Check if the string is a valid octal number.
 * If given value is not a string, then it returns false.
 */
export function isOctal(value: unknown): boolean {
    return typeof value === "string" && validator.isOctal(value);
}

/**
 * Check if the string is a valid octal number.
 * If given value is not a string, then it returns false.
 */
export function IsOctal(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_OCTAL,
            validator: {
                validate: (value, _args): boolean => isOctal(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be valid octal number",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
