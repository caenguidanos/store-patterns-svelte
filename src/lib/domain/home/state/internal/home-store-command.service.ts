import type { HomeStoreState } from "../../entity/home-store.entity";
import type { HomeStoreConfigService } from "./home-store-config.service";

export class HomeStoreCommandService {
   constructor(private readonly store: HomeStoreConfigService) {}

   public reset(): void {
      this.store.reset();
   }

   public updateData(initiator: string, next: HomeStoreState["data"]): void {
      this.store.update(initiator, (prev) => ({ ...prev, data: next }));
   }

   public updateLoading(initiator: string, next: HomeStoreState["loading"]): void {
      this.store.update(initiator, (prev) => ({ ...prev, loading: next }));
   }

   public updateError(initiator: string, next: HomeStoreState["error"]): void {
      this.store.update(initiator, (prev) => ({ ...prev, error: next }));
   }
}
