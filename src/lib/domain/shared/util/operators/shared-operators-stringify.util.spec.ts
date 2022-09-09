import { of, take } from "rxjs";
import { describe, it, expect } from "vitest";

import { stringify } from "./shared-operators-stringify.util";

describe("shared-operators-stringify.util", () => {
   it("should stringify", async () => {
      await new Promise<void>((res) =>
         of({ a: 1 })
            .pipe(take(1), stringify(0))
            .subscribe((value) => res(expect(value).toBe('{"a":1}'))),
      );
   });
});
