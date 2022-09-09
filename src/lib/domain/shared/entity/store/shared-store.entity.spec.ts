import { describe, it, expect } from "vitest";

import { StoreConfig } from "./shared-store-config.entity";
import { Store } from "./shared-store.entity";

describe("shared-store.entity", () => {
   it("should take snapshot", () => {
      let initialState = { k1: "2000m", k2: "3211m" } as const;

      @StoreConfig({ name: "test-store", resettable: true, inspector: true })
      class StoreConfigService extends Store<{ k1: string; k2: string }> {
         constructor() {
            super(initialState);
         }
      }

      let instance = new StoreConfigService();
      expect(instance.snapshot()).toStrictEqual(initialState);
   });

   it("should update key", () => {
      let initialState = { k1: "2000m", k2: "3211m" } as const;

      @StoreConfig({ name: "test-store", resettable: true, inspector: true })
      class StoreConfigService extends Store<{ k1: string; k2: string }> {
         constructor() {
            super(initialState);
         }
      }

      let instance = new StoreConfigService();
      instance
         .update("iniciator.js", (prev) => ({ ...prev, k1: "2001m" }))
         .update("iniciator.js", (prev) => ({ ...prev, k2: "3212m" }));
      expect(instance.snapshot()).toStrictEqual({ k1: "2001m", k2: "3212m" });
   });

   it("should reset", () => {
      let initialState = { k1: "2000m", k2: "3211m" } as const;

      @StoreConfig({ name: "test-store", resettable: true, inspector: true })
      class StoreConfigService extends Store<{ k1: string; k2: string }> {
         constructor() {
            super(initialState);
         }
      }

      let instance = new StoreConfigService();
      instance
         .update("iniciator.js", (prev) => ({ ...prev, k1: "2001m" }))
         .reset()
         .update("iniciator.js", (prev) => ({ ...prev, k2: "0m" }));
      expect(instance.snapshot()).toStrictEqual({ k1: "2000m", k2: "0m" });
   });

   it("should select value", async () => {
      let initialState = { k1: "2000m", k2: "3211m" } as const;

      @StoreConfig({ name: "test-store", resettable: true, inspector: true })
      class StoreConfigService extends Store<{ k1: string; k2: string }> {
         constructor() {
            super(initialState);
         }
      }

      let instance = new StoreConfigService();
      instance.update("iniciator.js", (prev) => ({ ...prev, k1: "2001m" }));

      await new Promise<void>((res) =>
         instance
            .select((state) => state.k1)
            .subscribe((value) => {
               res(expect(value).toStrictEqual("2001m"));
            }),
      );
   });
});
