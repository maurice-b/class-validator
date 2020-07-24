import {ValidationOptions} from "../ValidationOptions.ts";
import {buildMessage, ValidateBy} from "../common/ValidateBy.ts";
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

export const IS_RGB_COLOR = "isRgbColor";

/**
* Check if the string is a rgb or rgba color.
 * `includePercentValues` defaults to true. If you don't want to allow to set rgb or rgba values with percents, like rgb(5%,5%,5%), or rgba(90%,90%,90%,.3), then set it to false.
 * If given value is not a string, then it returns false.
 */
export function isRgbColor(value: unknown, includePercentValues?: boolean): boolean {
    return typeof value === "string" && validator.isRgbColor(value, includePercentValues);
}

/**
 * Check if the string is a rgb or rgba color.
 * `includePercentValues` defaults to true. If you don't want to allow to set rgb or rgba values with percents, like rgb(5%,5%,5%), or rgba(90%,90%,90%,.3), then set it to false.
 * If given value is not a string, then it returns false.
 */
export function IsRgbColor(includePercentValues?: boolean, validationOptions?: ValidationOptions): PropertyDecorator {
    return ValidateBy(
        {
            name: IS_RGB_COLOR,
            constraints: [includePercentValues],
            validator: {
                validate: (value, args): boolean => isRgbColor(value, (args && args.constraints[0])),
                defaultMessage: buildMessage(
                    (eachPrefix) => eachPrefix + "$property must be RGB color",
                    validationOptions
                )
            }
        },
        validationOptions
    );
}
