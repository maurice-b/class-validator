import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";

export const IS_DATE = "isDate";

/**
 * Checks if a given value is a number.
 */
export function isDate(value: unknown): boolean {
    return value instanceof Date && !isNaN(value.getTime());
}

/**
 * Checks if a value is a number.
 */
export function IsDate(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_DATE,
            validator: {
                validate: (value, _args): boolean => isDate(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a Date instance",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
