import {isValidationOptions, ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator, validatorInterface} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_MAC_ADDRESS = "isMacAddress";

/**
 * Check if the string is a MAC address.
 * If given value is not a string, then it returns false.
 */
export function isMACAddress(value: unknown, options?: validatorInterface.IsMACAddressOptions): boolean {
    return typeof value === "string" && validator.isMACAddress(value, options);
}

/**
 * Check if the string is a MAC address.
 * If given value is not a string, then it returns false.
 */
export function IsMACAddress(optionsArg?: validatorInterface.IsMACAddressOptions, validationOptionsArg?: ValidationOptions): PropertyDecorator;
export function IsMACAddress(validationOptionsArg?: ValidationOptions): PropertyDecorator;
export function IsMACAddress(optionsOrValidationOptionsArg?: validatorInterface.IsMACAddressOptions | ValidationOptions, validationOptionsArg?: ValidationOptions): PropertyDecorator {
    const options = !isValidationOptions(optionsOrValidationOptionsArg) ? optionsOrValidationOptionsArg : undefined;
    const validationOptions = isValidationOptions(optionsOrValidationOptionsArg) ? optionsOrValidationOptionsArg : validationOptionsArg;

    return ValidateBy(
        {
            name: IS_MAC_ADDRESS,
            constraints: [options],
            validator: {
                validate: (value, _args): boolean => isMACAddress(value, options),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a MAC Address",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
