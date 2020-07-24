import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_FULL_WIDTH = "isFullWidth";

/**
 * Checks if the string contains any full-width chars.
 * If given value is not a string, then it returns false.
 */
export function isFullWidth(value: unknown): boolean {
    return typeof value === "string" && validator.isFullWidth(value);
}

/**
 * Checks if the string contains any full-width chars.
 * If given value is not a string, then it returns false.
 */
export function IsFullWidth(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_FULL_WIDTH,
            validator: {
                validate: (value, _args): boolean => isFullWidth(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must contain a full-width characters",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
