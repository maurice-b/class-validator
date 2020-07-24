import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_BIC = "isBIC";

/**
 * Check if a string is a BIC (Bank Identification Code) or SWIFT code.
 * If given value is not a string, then it returns false.
 */
export function isBIC(value: unknown): boolean {
    return typeof value === "string" && validator.isBIC(value);
}

/**
 * Check if a string is a BIC (Bank Identification Code) or SWIFT code.
 * If given value is not a string, then it returns false.
 */
export function IsBIC(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_BIC,
            validator: {
                validate: (value, _args): boolean => isBIC(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a BIC or SWIFT code",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
