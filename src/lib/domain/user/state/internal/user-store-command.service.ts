import type { UserStoreState } from "../../entity/user-store.entity";
import type { UserStoreConfigService } from "./user-store-config.service";

export class UserStoreCommandService {
   constructor(private readonly store: UserStoreConfigService) {}

   public reset(): void {
      this.store.reset();
   }

   public updateData(initiator: string, next: UserStoreState["data"]): void {
      this.store.update(initiator, (prev) => ({ ...prev, data: next }));
   }

   public updateLoading(initiator: string, next: UserStoreState["loading"]): void {
      this.store.update(initiator, (prev) => ({ ...prev, loading: next }));
   }

   public updateError(initiator: string, next: UserStoreState["error"]): void {
      this.store.update(initiator, (prev) => ({ ...prev, error: next }));
   }
}
