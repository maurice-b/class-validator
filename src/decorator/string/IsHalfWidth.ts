import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_HALF_WIDTH = "isHalfWidth";

/**
 * Checks if the string contains any half-width chars.
 * If given value is not a string, then it returns false.
 */
export function isHalfWidth(value: unknown): boolean {
    return typeof value === "string" && validator.isHalfWidth(value);
}

/**
 * Checks if the string contains any full-width chars.
 * If given value is not a string, then it returns false.
 */
export function IsHalfWidth(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_HALF_WIDTH,
            validator: {
                validate: (value, _args): boolean => isHalfWidth(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must contain a half-width characters",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
