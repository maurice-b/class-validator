import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator, validatorInterface} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_URL = "isUrl";

/**
 * Checks if the string is an url.
 * If given value is not a string, then it returns false.
 */
export function isURL(value: string, options?: validatorInterface.IsURLOptions): boolean {
    return typeof value === "string" && validator.isURL(value, options);
}

/**
 * Checks if the string is an url.
 * If given value is not a string, then it returns false.
 */
export function IsUrl(options?: validatorInterface.IsURLOptions, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_URL,
            constraints: [options],
            validator: {
                validate: (value, args): boolean => isURL(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be an URL address",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
