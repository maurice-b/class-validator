import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_ASCII = "isAscii";

/**
 * Checks if the string contains ASCII chars only.
 * If given value is not a string, then it returns false.
 */
export function isAscii(value: unknown): boolean {
    return typeof value === "string" && validator.isAscii(value);
}

/**
 * Checks if the string contains ASCII chars only.
 * If given value is not a string, then it returns false.
 */
export function IsAscii(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_ASCII,
            validator: {
                validate: (value, _args): boolean => isAscii(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must contain only ASCII characters",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
