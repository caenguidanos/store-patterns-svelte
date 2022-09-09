import type { HomeQueryNewDataDTO } from "../entity/home-data-access.entity";

export class HomeDataAccessService {
   public queryNewData(): Promise<HomeQueryNewDataDTO> {
      return new Promise((res) =>
         setTimeout(
            () =>
               res({
                  status: 200,
                  data: [Date.now() + 1, Date.now() + 3, Date.now() + 5],
                  message: "OK",
               }),
            500,
         ),
      );
   }
}
