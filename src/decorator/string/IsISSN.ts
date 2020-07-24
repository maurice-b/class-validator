import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_ISSN = "isISSN";

export interface IsISSNOptions {
    require_hyphen?: boolean;
    case_sensitive?: boolean;
}

/**
 * Checks if the string is a ISSN.
 * If given value is not a string, then it returns false.
 */
export function isISSN(value: unknown, options?: IsISSNOptions): boolean {
    return typeof value === "string" && validator.isISSN(value, options);
}

/**
 * Checks if the string is a ISSN.
 * If given value is not a string, then it returns false.
 */
export function IsISSN(options?: IsISSNOptions, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_ISSN,
            constraints: [options],
            validator: {
                validate: (value, args): boolean => isISSN(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a ISSN",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
