import { HomeStoreCommandService } from "./internal/home-store-command.service";
import { HomeStoreConfigService } from "./internal/home-store-config.service";
import { HomeStoreQueryService } from "./internal/home-store-query.service";
import { HomeDataAccessService } from "../data-access/home-data-access.service";

import type { HomeStoreState } from "../entity/home-store.entity";

class HomeStoreService {
   public readonly data$ = this.homeStoreQueryService.data$;
   public readonly loading$ = this.homeStoreQueryService.loading$;
   public readonly error$ = this.homeStoreQueryService.error$;

   constructor(
      private readonly homeStoreQueryService: HomeStoreQueryService,
      private readonly homeStoreCommandService: HomeStoreCommandService,
      private readonly homeDataAccessService: HomeDataAccessService,
   ) {}

   public reset(): void {
      this.homeStoreCommandService.reset();
   }

   public snapshot(): HomeStoreState {
      return this.homeStoreQueryService.snapshot();
   }

   public snapshotToString(): string {
      return JSON.stringify(this.snapshot(), undefined, 3);
   }

   public async queryNewData(): Promise<void> {
      this.homeStoreCommandService.updateLoading(this.queryNewData.name, true);

      let { status, data, message } = await this.homeDataAccessService.queryNewData();

      switch (status) {
         case 200:
            this.homeStoreCommandService.updateData(this.queryNewData.name, data);
            this.homeStoreCommandService.updateError(this.queryNewData.name, null);
            break;

         default:
            this.homeStoreCommandService.updateData(this.queryNewData.name, null);
            this.homeStoreCommandService.updateError(this.queryNewData.name, message);
            break;
      }

      this.homeStoreCommandService.updateLoading(this.queryNewData.name, false);
   }
}

const homeStoreConfigService = new HomeStoreConfigService();
homeStoreConfigService.init();

export const homeStoreService = new HomeStoreService(
   new HomeStoreQueryService(homeStoreConfigService),
   new HomeStoreCommandService(homeStoreConfigService),
   new HomeDataAccessService(),
);
