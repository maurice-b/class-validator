import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator, validatorInterface} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_FQDN = "isFqdn";

/**
 * Checks if the string is a fully qualified domain name (e.g. domain.com).
 * If given value is not a string, then it returns false.
 */
export function isFQDN(value: unknown, options?: validatorInterface.IsFQDNOptions): boolean {
    return typeof value === "string" && validator.isFQDN(value, options);
}

/**
 * Checks if the string is a fully qualified domain name (e.g. domain.com).
 * If given value is not a string, then it returns false.
 */
export function IsFQDN(options?: validatorInterface.IsFQDNOptions, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_FQDN,
            constraints: [options],
            validator: {
                validate: (value, args): boolean => isFQDN(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a valid domain name",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
