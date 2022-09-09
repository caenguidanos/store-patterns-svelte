import { describe, it, expect } from "vitest";

import { StoreConfig } from "./shared-store-config.entity";
import { StoreInspector } from "./shared-store-inspector.entity";
import { Store } from "./shared-store.entity";

describe("shared-store-config.entity", () => {
   it("should assign properties", () => {
      @StoreConfig({
         name: "test-store",
         resettable: true,
         inspector: true,
      })
      class StoreService extends Store<{ a: number }> {
         constructor() {
            super({ a: 8 });
         }
      }

      let instance = new StoreService();
      expect((instance as any).name).toBe("test-store");
      expect((instance as any).isResettable).toBe(true);
      expect((instance as any).inspector).toBeInstanceOf(StoreInspector);
   });
});
