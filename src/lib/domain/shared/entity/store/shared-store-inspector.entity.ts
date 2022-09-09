const __registry = new Map<string, any>();

export class StoreInspector {
   public init(): void {
      if (globalThis.window) {
         if ((globalThis.window as any).__REDUX_DEVTOOLS_EXTENSION__) {
            (globalThis.window as any).__REDUX_DEVTOOLS_EXTENSION__.connect();
         }
      }
   }

   public dispatch(storeName: string, msg: string, newState: any): void {
      if (globalThis.window) {
         __registry.set(storeName, newState);

         (globalThis.window as any).__REDUX_DEVTOOLS_EXTENSION__.send(
            `[${storeName}::${msg}]`,
            Object.fromEntries(__registry),
         );
      }
   }
}
