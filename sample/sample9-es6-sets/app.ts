import {Validator} from "../../src/validation/Validator.ts";
import {Post} from "./Post.ts";
import {Tag} from "./Tag.ts";

const validator = new Validator();

const tag1 = new Tag();
tag1.value = "ja";

const tag2 = new Tag();
tag2.value = "node.js";

const post1 = new Post();
post1.title = "Hello world";
post1.tags = new Set();
post1.tags.add(tag1);
post1.tags.add(tag2);

validator.validate(post1).then(result => {
    console.log("1. should not pass: ", result);
});
