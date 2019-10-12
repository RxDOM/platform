import { DocumentLevelKeys } from '@rxdom/input';

describe('DocumentLevelKeys', () => {
  let documentLevelKeys: DocumentLevelKeys;

  beforeEach(() => {
    documentLevelKeys = new DocumentLevelKeys();
  });

  it('should emit on keydown', done => {
    const type = 'keydown';
    documentLevelKeys.keyEvents.subscribe(keyEvent => {
      expect(keyEvent.type).toBe(type);
      done();
    });
    const event = new KeyboardEvent(type, { key: 't' });
    document.dispatchEvent(event);
  });

  it('should emit on keyup', done => {
    const type = 'keyup';
    documentLevelKeys.keyEvents.subscribe(keyEvent => {
      expect(keyEvent.type).toBe(type);
      done();
    });
    const event = new KeyboardEvent(type, { key: 't' });
    document.dispatchEvent(event);
  });
});
