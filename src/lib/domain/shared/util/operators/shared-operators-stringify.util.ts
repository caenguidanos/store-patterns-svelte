import { Observable } from "rxjs";

export function stringify(indent: number) {
   return function <T>(source: Observable<T>): Observable<string> {
      return new Observable((subscriber) => {
         source.subscribe({
            next(value) {
               subscriber.next(JSON.stringify(value, undefined, indent));
            },
            error(error) {
               subscriber.error(error);
            },
            complete() {
               subscriber.complete();
            },
         });
      });
   };
}
