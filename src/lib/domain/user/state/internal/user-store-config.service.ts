import { Store, StoreConfig } from "$lib/domain/shared";

import type { UserStoreState } from "../../entity/user-store.entity";

function createInitialState(): UserStoreState {
   return {
      data: null,
      loading: false,
      error: null,
   };
}

@StoreConfig({ name: "user", resettable: true, inspector: true })
export class UserStoreConfigService extends Store<UserStoreState> {
   constructor() {
      super(createInitialState());
   }
}
