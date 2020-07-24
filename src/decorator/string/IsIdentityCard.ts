import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_IDENTITY_CARD = "isIdentityCard";

/**
 * Check if the string is a valid identity card code.
 * locale is one of ['ES', 'zh-TW', 'he-IL', 'ar-TN'] OR 'any'. If 'any' is used, function will check if any of the locals match.
 * Defaults to 'any'.
 * If given value is not a string, then it returns false.
 */
export function isIdentityCard(value: unknown, locale: string): boolean {
    return typeof value === "string" && validator.isIdentityCard(value, locale);
}

/**
 * Check if the string is a valid identity card code.
 * locale is one of ['ES', 'zh-TW', 'he-IL', 'ar-TN'] OR 'any'. If 'any' is used, function will check if any of the locals match.
 * Defaults to 'any'.
 * If given value is not a string, then it returns false.
 */
export function IsIdentityCard(locale?: string, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_IDENTITY_CARD,
            constraints: [locale],
            validator: {
                validate: (value, args): boolean => isIdentityCard(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be a identity card number",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
