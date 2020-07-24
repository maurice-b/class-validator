import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const MAX_LENGTH = "maxLength";

/**
 * Checks if the string's length is not more than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
export function maxLength(value: unknown, max: number): boolean {
    return typeof value === "string" && validator.isLength(value, { min: 0, max });
}

/**
 * Checks if the string's length is not more than given number. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
export function MaxLength(max: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: MAX_LENGTH,
            constraints: [max],
            validator: {
                validate: (value, args): boolean => maxLength(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be shorter than or equal to $constraint1 characters",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
