import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_VARIABLE_WIDTH = "isVariableWidth";

/**
 * Checks if the string contains variable-width chars.
 * If given value is not a string, then it returns false.
 */
export function isVariableWidth(value: unknown): boolean {
    return typeof value === "string" && validator.isVariableWidth(value);
}

/**
 * Checks if the string contains variable-width chars.
 * If given value is not a string, then it returns false.
 */
export function IsVariableWidth(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_VARIABLE_WIDTH,
            validator: {
                validate: (value, _args): boolean => isVariableWidth(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must contain a full-width and half-width characters",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
