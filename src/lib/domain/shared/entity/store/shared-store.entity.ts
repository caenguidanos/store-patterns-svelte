import { writable, get, type Updater } from "svelte/store";
import { distinctUntilChanged, map, Observable } from "rxjs";

import type { StoreInspector } from "./shared-store-inspector.entity";

export class Store<Y> {
   private name: string | undefined;
   private inspector: StoreInspector | undefined;
   private isResettable: boolean = false;

   private readonly __store = writable<Y>(this.initialState);
   private readonly __asObservable = new Observable<Readonly<Y>>((subscriber) =>
      this.__store.subscribe((value) => subscriber.next(Object.freeze(value))),
   );

   constructor(protected readonly initialState: Y) {}

   public init(): void {
      if (this.inspector) {
         this.inspector.dispatch(this.name, "INIT", this.initialState);
      }
   }

   public reset(): Store<Y> {
      if (this.isResettable) {
         this.__store.set(this.initialState);

         if (this.inspector) {
            this.inspector.dispatch(this.name, "RESET", this.initialState);
         }
      } else {
         console.warn(`Reset ${this.name}-store action is not allowed`);
      }

      return this;
   }

   public snapshot(): Y {
      let value = get(this.__store);

      if (this.inspector) {
         this.inspector.dispatch(this.name, "SNAPSHOT", value);
      }

      return value;
   }

   public select<K>(selector: (state: Y) => K): Observable<K> {
      return this.__asObservable.pipe(
         map((state) => selector(state)),
         distinctUntilChanged(),
      );
   }

   public update(initiator: string, updater: Updater<Y>): Store<Y> {
      this.__store.update(updater);

      if (this.inspector) {
         this.inspector.dispatch(this.name, initiator.concat(" UPDATE"), get(this.__store));
      }

      return this;
   }
}
