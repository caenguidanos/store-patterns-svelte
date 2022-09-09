import type { UserStoreState } from "../../entity/user-store.entity";
import type { UserStoreConfigService } from "./user-store-config.service";

export class UserStoreQueryService {
   public data$ = this.store.select((state) => state.data);
   public loading$ = this.store.select((state) => state.loading);
   public error$ = this.store.select((state) => state.error);

   constructor(private readonly store: UserStoreConfigService) {}

   public snapshot(): UserStoreState {
      return this.store.snapshot();
   }
}
