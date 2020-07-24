import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_ALPHA = "isAlpha";

/**
 * Checks if the string contains only letters (a-zA-Z).
 * If given value is not a string, then it returns false.
 */
export function isAlpha(value: unknown, locale?: string): boolean {
    return typeof value === "string" && validator.isAlpha(value, locale);
}

/**
 * Checks if the string contains only letters (a-zA-Z).
 * If given value is not a string, then it returns false.
 */
export function IsAlpha(locale?: string, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_ALPHA,
            constraints: [locale],
            validator: {
                validate: (value, args): boolean => isAlpha(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must contain only letters (a-zA-Z)",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
