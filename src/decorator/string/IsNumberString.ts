import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator, validatorInterface} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_NUMBER_STRING = "isNumberString";

/**
 * Checks if the string is numeric.
 * If given value is not a string, then it returns false.
 */
export function isNumberString(value: unknown, options?: validatorInterface.IsNumericOptions): boolean {
    return typeof value === "string" && validator.isNumeric(value, options);
}

/**
 * Checks if the string is numeric.
 * If given value is not a string, then it returns false.
 */
export function IsNumberString(options?: validatorInterface.IsNumericOptions, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_NUMBER_STRING,
            constraints: [options],
            validator: {
                validate: (value, args): boolean => isNumberString(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a number string",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
