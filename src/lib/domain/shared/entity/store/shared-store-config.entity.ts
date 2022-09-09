import { StoreInspector } from "./shared-store-inspector.entity";

interface StoreConfigOptions {
   name: string;
   resettable: boolean;
   inspector: boolean;
}

export function StoreConfig(options: StoreConfigOptions) {
   return function <T extends { new (...args: any[]): {} }>(constructor: T) {
      let storeInspector: StoreInspector | undefined;

      if (options.inspector) {
         try {
            storeInspector = new StoreInspector();
            storeInspector.init();
         } catch (error) {
            console.warn("StoreInspector not loaded");
         }
      }

      return class extends constructor {
         name = options.name;
         inspector = storeInspector;
         isResettable = options.resettable;
      };
   };
}
