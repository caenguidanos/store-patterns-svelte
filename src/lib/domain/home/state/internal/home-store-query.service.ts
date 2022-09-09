import type { HomeStoreState } from "../../entity/home-store.entity";
import type { HomeStoreConfigService } from "./home-store-config.service";

export class HomeStoreQueryService {
   public data$ = this.store.select((state) => state.data);
   public loading$ = this.store.select((state) => state.loading);
   public error$ = this.store.select((state) => state.error);

   constructor(private readonly store: HomeStoreConfigService) {}

   public snapshot(): HomeStoreState {
      return this.store.snapshot();
   }
}
