import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_PORT = "isPort";

/**
 * Check if the string is a valid port number.
 */
export function isPort(value: unknown): boolean {
    return typeof value === "string" && validator.isPort(value);
}

/**
 * Check if the string is a valid port number.
 */
export function IsPort(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_PORT,
            validator: {
                validate: (value, _args): boolean => isPort(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a port",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
