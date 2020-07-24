import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_BYTE_LENGTH = "isByteLength";

/**
 * Checks if the string's length (in bytes) falls in a range.
 * If given value is not a string, then it returns false.
 */
export function isByteLength(value: unknown, min: number, max?: number): boolean {
    return typeof value === "string" && validator.isByteLength(value, { min, max });
}

/**
 * Checks if the string's length (in bytes) falls in a range.
 * If given value is not a string, then it returns false.
 */
export function IsByteLength(min: number, max?: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_BYTE_LENGTH,
            constraints: [min, max],
            validator: {
                validate: (value, args): boolean => isByteLength(value, (args && args.constraints[0]), (args && args.constraints[1])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property's byte length must fall into ($constraint1, $constraint2) range",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
