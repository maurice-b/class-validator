import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_DECIMAL = "isDecimal";

export interface IsDecimalOptions {
    force_decimal: boolean;
    decimal_digits: string;
    locale: string;
}

/**
 * Checks if the string is a valid decimal.
 * If given value is not a string, then it returns false.
 */
export function isDecimal(value: unknown, options?: IsDecimalOptions): boolean {
    return typeof value === "string" && validator.isDecimal(value, options);
}

/**
 * Checks if the string contains only letters and numbers.
 * If given value is not a string, then it returns false.
 */
export function IsDecimal(options?: IsDecimalOptions, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_DECIMAL,
            constraints: [options],
            validator: {
                validate: (value, args): boolean => isDecimal(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property is not a valid decimal number.",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
