import { fromEvent, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

let interceptor: Observable<MouseEvent>;

export function anchorTagInterceptor(): Observable<MouseEvent> {
  if (!interceptor) {
    interceptor = fromEvent<MouseEvent>(document, 'click').pipe(
      filter(mouseEvent => mouseEvent.target instanceof HTMLAnchorElement)
    );
  }
  return interceptor;
}
