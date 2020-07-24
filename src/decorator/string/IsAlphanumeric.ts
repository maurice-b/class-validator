import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_ALPHANUMERIC = "isAlphanumeric";

/**
 * Checks if the string contains only letters and numbers.
 * If given value is not a string, then it returns false.
 */
export function isAlphanumeric(value: unknown, locale?: string): boolean {
    return typeof value === "string" && validator.isAlphanumeric(value, locale);
}

/**
 * Checks if the string contains only letters and numbers.
 * If given value is not a string, then it returns false.
 */
export function IsAlphanumeric(locale?: string, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_ALPHANUMERIC,
            constraints: [locale],
            validator: {
                validate: (value, args): boolean => isAlphanumeric(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must contain only letters and numbers",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
