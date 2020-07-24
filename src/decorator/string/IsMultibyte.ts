import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_MULTIBYTE = "isMultibyte";

/**
 * Checks if the string contains one or more multibyte chars.
 * If given value is not a string, then it returns false.
 */
export function isMultibyte(value: unknown): boolean {
    return typeof value === "string" && validator.isMultibyte(value);
}

/**
 * Checks if the string contains one or more multibyte chars.
 * If given value is not a string, then it returns false.
 */
export function IsMultibyte(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_MULTIBYTE,
            validator: {
                validate: (value, _args): boolean => isMultibyte(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must contain one or more multibyte chars",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
