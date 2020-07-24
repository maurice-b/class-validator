import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_MAGNET_URI = "isMagnetURI";

/**
 * Check if the string is a magnet uri format.
 * If given value is not a string, then it returns false.
 */
export function isMagnetURI(value: unknown): boolean {
    return typeof value === "string" && validator.isMagnetURI(value);
}

/**
 * Check if the string is a magnet uri format.
 * If given value is not a string, then it returns false.
 */
export function IsMagnetURI(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_MAGNET_URI,
            validator: {
                validate: (value, _args): boolean => isMagnetURI(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be magnet uri format",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
