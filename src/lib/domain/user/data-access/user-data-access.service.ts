import type { UserQueryProfileDTO } from "../entity/user-data-access.entity";

export class UserDataAccessService {
   public queryProfile(): Promise<UserQueryProfileDTO> {
      return new Promise((res) =>
         setTimeout(
            () =>
               res({
                  status: 200,
                  data: {
                     name: "Camel",
                     email: "camel@case.com",
                  },
                  message: "OK",
               }),
            400,
         ),
      );
   }
}
