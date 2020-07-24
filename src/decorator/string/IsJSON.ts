import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_JSON = "isJson";

/**
 * Checks if the string is valid JSON (note: uses JSON.parse).
 * If given value is not a string, then it returns false.
 */
export function isJSON(value: unknown): boolean {
    return typeof value === "string" && validator.isJSON(value);
}

/**
 * Checks if the string is valid JSON (note: uses JSON.parse).
 * If given value is not a string, then it returns false.
 */
export function IsJSON(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_JSON,
            validator: {
                validate: (value, _args): boolean => isJSON(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a json string",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
