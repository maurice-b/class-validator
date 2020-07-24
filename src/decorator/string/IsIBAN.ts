import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_IBAN = "isIBAN";

/**
 * Check if a string is a IBAN (International Bank Account Number).
 * If given value is not a string, then it returns false.
 */
export function isIBAN(value: unknown): boolean {
    return typeof value === "string" && validator.isIBAN(value);
}

/**
 * Check if a string is a IBAN (International Bank Account Number).
 * If given value is not a string, then it returns false.
 */
export function IsIBAN(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_IBAN,
            validator: {
                validate: (value, _args): boolean => isIBAN(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be an IBAN",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
