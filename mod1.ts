
import {validator} from "file:D:/Development/Projects/Personal/deno-libs/validator/mod.ts";

console.log("test");

const result = validator.isMongoId("test");
console.log(result);
