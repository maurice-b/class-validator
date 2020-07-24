import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const MATCHES = "matches";

/**
 * Checks if string matches the pattern. Either matches('foo', /foo/i).
 * If given value is not a string, then it returns false.
 */
export function matches(value: string, pattern: RegExp): boolean;
export function matches(value: string, pattern: string, modifiers: string): boolean;
export function matches(value: string, pattern: RegExp | string, modifiers?: string): boolean {
    return typeof value === "string" && validator.matches(value, pattern as unknown as any, modifiers);
}

/**
 * Checks if string matches the pattern. Either matches('foo', /foo/i)
 * If given value is not a string, then it returns false.
 */
export function Matches(pattern: RegExp, validationOptions?: ValidationOptions): PropertyDecorator;
export function Matches(pattern: string, modifiers?: string, validationOptions?: ValidationOptions): PropertyDecorator;
export function Matches(pattern: RegExp | string, modifiersOrAnnotationOptions?: string | ValidationOptions, validationOptions?: ValidationOptions): PropertyDecorator {
    const constraints = [pattern];

    if (modifiersOrAnnotationOptions && modifiersOrAnnotationOptions instanceof Object && !validationOptions) {
        validationOptions = modifiersOrAnnotationOptions;
    } else {
        const modifiers = modifiersOrAnnotationOptions as string;
        constraints.push(modifiers);
    }

    return ValidateBy(
        {
            name: MATCHES,
            constraints: [...constraints],
            validator: {
                validate: (value, args): boolean => matches(value, (args && args.constraints[0]), (args && args.constraints[1])),
                defaultMessage: buildMessage(
                    (eachPrefix, _args) => eachPrefix + "$property must match $constraint1 regular expression",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
