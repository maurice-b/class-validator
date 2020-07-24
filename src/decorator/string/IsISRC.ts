import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_ISRC = "isISRC";

/**
 * Check if the string is a ISRC.
 * If given value is not a string, then it returns false.
 */
export function isISRC(value: unknown): boolean {
    return typeof value === "string" && validator.isISRC(value);
}

/**
 * Check if the string is a ISRC.
 * If given value is not a string, then it returns false.
 */
export function IsISRC(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_ISRC,
            validator: {
                validate: (value, _args): boolean => isISRC(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be an ISRC",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
