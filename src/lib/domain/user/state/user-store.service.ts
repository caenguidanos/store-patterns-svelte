import { UserStoreCommandService } from "./internal/user-store-command.service";
import { UserStoreConfigService } from "./internal/user-store-config.service";
import { UserStoreQueryService } from "./internal/user-store-query.service";
import { UserDataAccessService } from "../data-access/user-data-access.service";

import type { UserStoreState } from "../entity/user-store.entity";

class UserStoreService {
   public readonly data$ = this.userStoreQueryService.data$;
   public readonly loading$ = this.userStoreQueryService.loading$;
   public readonly error$ = this.userStoreQueryService.error$;

   constructor(
      private readonly userStoreQueryService: UserStoreQueryService,
      private readonly userStoreCommandService: UserStoreCommandService,
      private readonly userDataAccessService: UserDataAccessService,
   ) {}

   public reset(): void {
      this.userStoreCommandService.reset();
   }

   public snapshot(): UserStoreState {
      return this.userStoreQueryService.snapshot();
   }

   public snapshotToString(): string {
      return JSON.stringify(this.snapshot(), undefined, 3);
   }

   public async queryProfile(): Promise<void> {
      this.userStoreCommandService.updateLoading(this.queryProfile.name, true);

      let { status, data, message } = await this.userDataAccessService.queryProfile();

      switch (status) {
         case 200:
            this.userStoreCommandService.updateData(this.queryProfile.name, data);
            this.userStoreCommandService.updateError(this.queryProfile.name, null);
            break;

         default:
            this.userStoreCommandService.updateData(this.queryProfile.name, null);
            this.userStoreCommandService.updateError(this.queryProfile.name, message);
            break;
      }

      this.userStoreCommandService.updateLoading(this.queryProfile.name, false);
   }
}

const userStoreConfigService = new UserStoreConfigService();
userStoreConfigService.init();

export const userStoreService = new UserStoreService(
   new UserStoreQueryService(userStoreConfigService),
   new UserStoreCommandService(userStoreConfigService),
   new UserDataAccessService(),
);
