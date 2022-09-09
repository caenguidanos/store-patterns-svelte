import { Store, StoreConfig } from "$lib/domain/shared";

import type { HomeStoreState } from "../../entity/home-store.entity";

function createInitialState(): HomeStoreState {
   return {
      data: null,
      loading: false,
      error: null,
   };
}

@StoreConfig({ name: "home", resettable: true, inspector: true })
export class HomeStoreConfigService extends Store<HomeStoreState> {
   constructor() {
      super(createInitialState());
   }
}
