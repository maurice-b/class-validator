import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export type UUIDVersion = "3" | "4" | "5" | "all" | 3 | 4 | 5;

export const IS_UUID = "isUuid";

/**
 * Checks if the string is a UUID (version 3, 4 or 5).
 * If given value is not a string, then it returns false.
 */
export function isUUID(value: unknown, version?: UUIDVersion): boolean {
    return typeof value === "string" && validator.isUUID(value, String(version));
}

/**
 * Checks if the string is a UUID (version 3, 4 or 5).
 * If given value is not a string, then it returns false.
 */
export function IsUUID(version?: UUIDVersion, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_UUID,
            constraints: [version],
            validator: {
                validate: (value, args): boolean => isUUID(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be an UUID",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
