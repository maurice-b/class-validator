import * as hooked from "https://x.nest.land/hooked@0.1.0/mod.ts";

import * as log from "https://deno.land/std/log/mod.ts";
import {expect} from "https://deno.land/x/expect/mod.ts";


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function describe(name: string, fn: () => void | Promise<void>) {
    return hooked.group(name, fn);
}

export function it(name: Deno.TestDefinition | string, fn?: () => void | Promise<void>) {
    // @ts-ignore
    return hooked.test(name, fn);
}

export {
    expect,
    log,
    hooked
};

