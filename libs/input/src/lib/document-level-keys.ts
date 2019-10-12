import { fromEvent, merge, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

export interface KeyEvent {
  readonly key: string;
  readonly type: string;
}

export class DocumentLevelKeys {
  public readonly keyEvents: Observable<KeyEvent>;
  private activated: { [code: string]: boolean } = {};

  constructor() {
    this.keyEvents = merge(
      fromEvent<KeyboardEvent>(document, 'keydown').pipe(
        filter(keyboardEvent => !this.activated[keyboardEvent.code]),
        tap(keyboardEvent => {
          this.activated[keyboardEvent.code] = false;
        })
      ),
      fromEvent<KeyboardEvent>(document, 'keyup').pipe(
        tap(keyboardEvent => {
          this.activated[keyboardEvent.code] = true;
        })
      )
    ).pipe(
      map(keyboardEvent => ({
        key: keyboardEvent.key,
        type: keyboardEvent.type
      }))
    );
  }
}
