import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_PASSPORT_NUMBER = "isPassportNumber";

/**
 * Check if the string is a valid passport number relative to a specific country code.
 * If given value is not a string, then it returns false.
 */
export function isPassportNumber(value: unknown, countryCode: string): boolean {
    return typeof value === "string" && validator.isPassportNumber(value, countryCode);
}

/**
 * Check if the string is a valid passport number relative to a specific country code.
 * If given value is not a string, then it returns false.
 */
export function IsPassportNumber(countryCode: string, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_PASSPORT_NUMBER,
            constraints: [countryCode],
            validator: {
                validate: (value, args): boolean => isPassportNumber(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be valid passport number",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
