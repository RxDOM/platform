import { anchorTagInterceptor } from '@rxdom/input';

function createElement(tagName: string): HTMLElement {
  return document.body.appendChild(document.createElement(tagName));
}

describe('AnchorTagInterceptor', () => {
  beforeEach(() => {
    // NOTE: Jest does not clean the JSDOM document after each test run!
    //       It only clears the DOM after all tests inside an entire file are completed.
    document.body.innerHTML = '';
  });

  it('should only create one instance of the event stream', () => {
    const first = anchorTagInterceptor();
    const second = anchorTagInterceptor();
    const third = anchorTagInterceptor();
    expect(second).toBe(first);
    expect(third).toBe(first);
  });

  it('should run on anchor tag click', () => {
    const handler = jest.fn();
    anchorTagInterceptor().subscribe(handler);
    createElement('a').click();
    expect(handler).toBeCalledTimes(1);
  });

  it('should run on all anchor tag clicks', () => {
    const handler = jest.fn();
    anchorTagInterceptor().subscribe(handler);
    createElement('a').click();
    createElement('a').click();
    expect(document.getElementsByTagName('a').length).toBe(2);
    expect(handler).toBeCalledTimes(2);
  });

  it('should not run when non-anchor is clicked', () => {
    const handler = jest.fn();
    anchorTagInterceptor().subscribe(handler);
    createElement('div').click();
    expect(handler).not.toBeCalled();
  });

  it('should not run when anchor stops propagation', () => {
    const handler = jest.fn();
    anchorTagInterceptor().subscribe(handler);
    const element = createElement('a');
    element.addEventListener('click', e => {
      e.stopPropagation();
    });
    element.click();
    expect(handler).not.toBeCalled();
  });
});
