export interface UserStoreState {
   data: { name: string; email: string } | null;
   loading: boolean;
   error: string | null;
}
