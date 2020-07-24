import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";

export const IS_BOOLEAN = "isBoolean";

/**
 * Checks if a given value is a number.
 */
export function isBoolean(value: unknown): boolean {
    return value instanceof Boolean || typeof value === "boolean";
}

/**
 * Checks if a value is a number.
 */
export function IsBoolean(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_BOOLEAN,
            validator: {
                validate: (value, _args): boolean => isBoolean(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a boolean value",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
