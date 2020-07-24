import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_CREDIT_CARD = "isCreditCard";

/**
 * Checks if the string is a credit card.
 * If given value is not a string, then it returns false.
 */
export function isCreditCard(value: unknown): boolean {
    return typeof value === "string" && validator.isCreditCard(value);
}

/**
 * Checks if the string is a credit card.
 * If given value is not a string, then it returns false.
 */
export function IsCreditCard(validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_CREDIT_CARD,
            validator: {
                validate: (value, _args): boolean => isCreditCard(value),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a credit card",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
