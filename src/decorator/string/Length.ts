import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const LENGTH = "length";

/**
 * Checks if the string's length falls in a range. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
export function length(value: unknown, min: number, max?: number): boolean {
    return typeof value === "string" && validator.isLength(value, { min, max });
}

/**
 * Checks if the string's length falls in a range. Note: this function takes into account surrogate pairs.
 * If given value is not a string, then it returns false.
 */
export function Length(min: number, max?: number, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: LENGTH,
            constraints: [min, max],
            validator: {
                validate: (value, args): boolean => length(value, (args && args.constraints[0]), (args && args.constraints[1])),
                defaultMessage: buildMessage(
                    (eachPrefix, args) => {
                        const isMinLength = (args && args.constraints[0]) !== null && (args && args.constraints[0]) !== undefined;
                        const isMaxLength = (args && args.constraints[1]) !== null && (args && args.constraints[1]) !== undefined;
                        if (isMinLength && ( args && (!args.value || args.value.length < args.constraints[0]))) {
                            return eachPrefix + "$property must be longer than or equal to $constraint1 characters";
                        } else if (isMaxLength && (args && (args.value.length > args.constraints[1]))) {
                            return eachPrefix + "$property must be shorter than or equal to $constraint2 characters";
                        }
                        return eachPrefix + "$property must be longer than or equal to $constraint1 and shorter than or equal to $constraint2 characters";
                    },
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
