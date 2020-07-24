import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_BASE32 = "isBase32";

/**
 * Checks if a string is base32 encoded.
 * If given value is not a string, then it returns false.
 */
export function isBase32(value: unknown): boolean {
    return typeof value === "string" && validator.isBase32(value);
}

/**
 * Check if a string is base32 encoded.
 * If given value is not a string, then it returns false.
 */
export function IsBase32(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_BASE32,
            validator: {
                validate: (value, _args): boolean => isBase32(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be base32 encoded",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
